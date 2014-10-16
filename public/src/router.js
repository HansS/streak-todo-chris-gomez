steal(
  'can',
  'src/model/state.js',
  'can/map/define',
  'can/route/pushstate',
function (can, state) {
  return function (model, mainEl) {

    var routes = {
      '': {
        controller: 'landing',
        action: 'index'
      },
      '/login': {
        controller: 'auth',
        action: 'login'
      },
      '/signup': {
        controller: 'auth',
        action: 'signup'
      },
      '/logout': {
        controller: 'auth',
        action: 'logout'
      },
      '/log': {
        controller: 'log',
        action: 'index'
      },
      '/log/:date': {
        controller: 'log',
        action: 'date',
      },
      '/log/:fromDate...:toDate': {
        controller: 'log',
        action: 'range',
      }
    };

    var controllers = {
      landing: {
        script: 'src/controller/landing/',
        markup: '<landing-controller></landing-controller>',
        preDispatch: function () {

          // Redirect to app if authenticated
          if (can.route.attr('authenticated')) {
            can.route.attr({
              controller: 'log',
              action: 'index'
            });

            // Don't continue the original route
            return false;
          }
        }
      },
      auth: {
        script: 'src/controller/auth/',
        markup: '<auth-controller user="{user}" action="{action}"></auth-controller>'
      },
      log: {
        script: 'src/controller/log/',
        markup: '<log-controller></log-controller>',
        requireAuth: true
      }
    };

    // Use our state object for route attrs
    can.route.map(state);

    // Index the routes by path
    can.each(routes, function (params, route) {
      can.route(route, params);
    });


    // Keep track of the route number so we can detect when "route" events
    // are fired twice (i.e. When the route === '').
    var lastBatchNum = null;

    can.route.bind('route', function (ev, route, oldRoute) {
      var currentBatchNum = ev.batchNum;

      // console.log(ev)
      // console.log(lastBatchNum, currentBatchNum, route)

      // Don't bother rendering anything if this is just CanJS
      // wigging out. Unless it's wigging out by excluding a batchNum.
      // In that case there's nothing we can do.
      if (currentBatchNum !== undefined && currentBatchNum === lastBatchNum) {
        return;
      }

      // Update our records.
      lastBatchNum = currentBatchNum;

      var controllerName = can.route.attr('controller');
      var controllerMeta = controllers[controllerName];

      // If there's a preDispatch function, call it
      if (controllerMeta.preDispatch &&
          can.isFunction(controllerMeta.preDispatch)) {

        // If the preDispatch function returns false, treat it like
        // an onclick handler and don't continue
        if (! controllerMeta.preDispatch()) {
          return;
        }
      }

      // If this is a controller that requires authentication, and
      // the user isn't authenticated, take them to the login page.
      if (controllerMeta.requireAuth && ! can.route.attr('authenticated')) {

        can.route.attr({
          controller: 'auth',
          action: 'login',

          // TODO: Figure out how to make this useful
          returnUrl: window.location.pathname + window.location.search
        });

        state.alert('warning', 'Sorry',
          'You\'ll need to login to access that page');

        return;
      }

      console.log('Loading..', controllerMeta.script);

      // Get the component JS
      System.import(controllerMeta.script).then(function() {

        // Check that this script is still relevant. The route may
        // have changed since we started loading it
        if (controllerName !== can.route.attr('controller')) {
          return;
        }

        console.log('Rendering..', controllerMeta.markup);

        // Insert the component HTML tag
        var fragment = can.stache(controllerMeta.markup)(state);
        mainEl.html(fragment);
      });

    });

    // Start the router
    can.route.ready();
  };
});