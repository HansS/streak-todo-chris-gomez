steal(
  'can',
  'src/model/state.js',
  'can/map/define',
  'can/route/pushstate',
function (can, state) {
  return function (model, mainEl) {

    var routes = {
      '': {
        controller: 'landing'
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
        controller: 'log'
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
      landing: '<landing-controller></landing-controller>',
      auth: '<auth-controller user="{user}" action="{action}"></auth-controller>',
      log: '<log-controller show-modal="{showModal}"></log-controller>'
    };

    // Use our state object for route attrs
    can.route.map(state);

    // Apply our routes
    can.each(routes, function (params, route) {
      can.route(route, params);
    });

    state.bind('controller', function (ev, newController, oldController) {
      var controllerName = newController;
      var script = 'src/controller/' + controllerName + '/' + controllerName;
      var template = controllers[controllerName];

      console.log('Loading..', script);

      // Get the component JS
      System.import(script).then(function() {

        // Check that this script is still relevant. The route may
        // have changed since we started loading it
        if (controllerName !== state.attr('controller')) {
          console.log('Aborting render of', template);
          return;
        }

        console.log('Rendering..', template);

        // Insert the component HTML tag
        var fragment = can.stache(template)(state);
        mainEl.html(fragment);
      });

    });

    // Start the router
    can.route.ready();
  };
});