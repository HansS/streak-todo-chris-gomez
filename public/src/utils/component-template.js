steal('can',
  './template.stache!',
  'can/map/define',
  function (can, template) {

  var ViewModel = can.Map.extend({
    define: {

    }
  });

  return can.Component.extend({
    tag: 'app-',
    template: template,
    scope: ViewModel,
    events: {
      inserted: function () {

      }
    }
  });

});