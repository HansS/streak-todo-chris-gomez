steal(
  'can',
  './todos.stache!',

  './todos.less!',
  'src/component/todo',
  'can/map/define',
function (can, template) {

  var ViewModel = can.Map.extend({
    define: {
    }
  });

  return can.Component.extend({
    tag: 'app-todos',
    template: template,
    scope: ViewModel,
    events: {
      init: function () {

      },
      inserted: function () {

      }
    }
  });
});