steal(
  'can',
  'src/model/state.js',
  'can/map/define',
  'can/route/pushstate',
function (can, state) {
  return function (model, mainEl) {

    var routes = {
      '': {
        template: 'landing',
        context: 'landing',
      },
      '/login': {
        template: 'auth',
        context: 'login'
      },
      '/signup': {
        template: 'auth',
        context: 'signup'
      },
      '/logout': {
        template: 'auth',
        context: 'logout'
      },
      '/log/:date': {
        template: 'log',
        context: 'log',
      }
    };

    var templates = {
      landing: {
        script: 'src/page/landing/',
        markup: '<landing-page></landing-page>',
      },
      auth: {
        script: 'src/page/auth/',
        markup: '<auth-page user="{user}" context="{context}"></auth-page>'
      },
      log: {
        script: 'src/page/log/',
        markup: '<log-page></log-page>'
      }
    };

    can.route.map(state);

    // // Index the routes by path
    can.each(routes, function (params, route) {
      can.route(route, params);
    });

    // Listen for changes to can.route.attr('template') so that we can
    // the insert the page component template and load its javascript
    can.route.bind('change', function (ev, property, change, newVal) {

      // If the "template" property is updated, load a different template
      if (property === 'template') {

        var template = templates[newVal];

        console.log(template);

        // Get the component JS
        System.import(template.script).then(function() {

          // Insert the component HTML tag
          var fragment = can.stache(template.markup)(state);
          mainEl.html(fragment);

        });
      }
    });

    // Start the router
    can.route.ready();
  };
});