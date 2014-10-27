steal('can',
  './settings.stache!',

  './settings.less!',
  'can/map/define',
  function (can, template) {

  var ViewModel = can.Map.extend({
    define: {

    }
  });

  return can.Component.extend({
    tag: 'todo-settings',
    template: template,
    scope: ViewModel,
    events: {
      inserted: function () {

      }
    }
  });

});