steal(
  'can',
  'src/model/state.js',
  'can/route/pushstate',
function (can, state) {
  return function (model, mainEl) {
    var routes = [
      {
        path: '',
        script: 'src/page/landing/',
        template: '<landing-page></landing-page>'
      },
      {
        path: [
          'login',
          'signup',
          'logout'
        ],
        script: 'src/page/auth/',
        template: '<auth-page user="{user}"></auth-page>'
      },
      {
        path: 'log/:date',
        script: 'src/page/log/',
        template: '<log-page></log-page>'
      }
    ];

    var routesByPath = {};

    // Index the routes by path
    can.each(routes, function (route) {
      if (typeof route.path === 'string') {
        routesByPath[route.path] = route;
      } else {
        can.each(route.path, function (path) {
          routesByPath[path] = route;
        });
      }
    });

    // Register the route
    can.each(routesByPath, function (route, path) {
      can.route(path, route.params);
    });

    // Handle route changes
    can.route.bind('route', function(ev, route, previous) {
      var routeMeta = routesByPath[route || ''];
      var previousMeta = routesByPath[previous];

      // If..
      // The route exists
      // And, the routeMeta exists
      // And, there is no previousMeta
      //  Or, the previous template is the same as the current template
      if(typeof route !== 'undefined' && routeMeta && (! previousMeta ||
          (previousMeta.template !== routeMeta.template))) {

        // Get the component JS
        System.import(routeMeta.script).then(function() {

          // Insert the component HTML tag
          var fragment = can.stache(routeMeta.template)(state);
          mainEl.html(fragment);

        });
      }
    });

    // Start the router
    can.route.ready();
  }
});