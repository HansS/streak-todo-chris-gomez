steal(
  'can',
  './log.stache!',
  'src/model/state.js',
  'src/model/todo.js',
  './log.less!',

  'src/component/form',
  'src/component/todos',
  'can/map/define',
function (can, template, state, TodoModel) {

  var ViewModel = can.Map.extend({
    define: {
    }
  });

  return can.Component.extend({
    tag: 'log-controller',
    template: template,
    scope: ViewModel,
    events: {
      inserted: function () {
        var userId = state.attr('user').attr('_id');

        if (! userId) {
          return;
        }

        TodoModel.findAll({
          query: {
            match: {
              user_id: userId
            }
          }
        }).then(function (todoModels) {
          state.attr('todos').replace(todoModels);
        });
      }
    }
  });
});