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
      '/log/:dateSlug': {
        controller: 'log',
        action: 'index'
      },
      '/log/:fromDate...:toDate': {
        controller: 'log'
      }
    };

    var controllers = {
      landing: {
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
        markup: '<auth-controller user="{user}" action="{action}"></auth-controller>'
      },
      log: {
        markup: '<log-controller date-slug="{dateSlug}" modal="{modal}"></log-controller>',
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

    // Keep track of the last controller. An action change will trigger a
    // route change, but really, we only want to "rerender" when the
    // controller is different.
    var lastControllerName = null;

    can.route.bind('route', function (ev, route, oldRoute) {
      var currentBatchNum = ev.batchNum;

      // debugger;

      // Don't bother rendering anything if this is just CanJS
      // wigging out. Unless it's wigging out by excluding a batchNum.
      // In that case there's nothing we can do.
      if (currentBatchNum !== undefined && currentBatchNum === lastBatchNum) {
        return;
      }

      // Update our records.
      lastBatchNum = currentBatchNum;

      var controllerName = can.route.attr('controller');

      // Sometimes can.route resets itself before applying the proper
      // route. Not sure what I'm doing to cause this.
      if (typeof controllerName === 'undefined') {
        console.log('Info: Cancelling render. Undefined controller name.')
        return;
      }

      var controllerMeta = controllers[controllerName];
      var script = 'src/controller/' + controllerName + '/' + controllerName;

      // If there's a preDispatch function, call it
      if (controllerMeta.preDispatch &&
          can.isFunction(controllerMeta.preDispatch)) {

        // If the preDispatch function returns false, treat it like
        // an onclick handler and don't continue
        if (controllerMeta.preDispatch() === false) {
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
          // returnUrl: window.location.pathname + window.location.search
        });

        state.alert('warning', 'Sorry',
          'You\'ll need to login to access that page');

        return;
      }

      if (controllerName === lastControllerName) {
        console.log(
          'Info: Cancelling render. Duplicate controller names.');
        return;
      } else {
        lastControllerName = controllerName;
      }

      console.log('Loading..', script);

      // Get the component JS
      System.import(script).then(function() {

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