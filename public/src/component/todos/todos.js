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
    },
    helpers: {
      isCompleted: function (todo, options) {
        if (todo.attr('state') === 'completed') {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      }
    }
  });
});