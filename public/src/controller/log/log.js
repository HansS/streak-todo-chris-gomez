steal(
  'can',
  './log.stache!',
  'src/model/state.js',
  'src/model/todo.js',
  './log.less!',

  'src/component/date-nav',
  'src/component/form',
  'src/component/todos',
  'can/map/define',
  'can/list/promise',
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
        var self = this;
        var userId = state.attr('user').attr('_id');

        if (! userId) {
          return;
        }

        var todoList = TodoModel.findAll({
          query: {
            match: {
              user_id: userId
            }
          },
          sort: {
            created_at: {
              order: 'desc'
            }
          }
        });

        todoList.fail(function () {
          state.alert('danger', 'Blast',
            'There was an error getting your todos. Cross your fingers ' +
            'and try again.');
        });

        state.attr('todos').replace(todoList);

        // DEV: Open the first todo's settings
        todoList.then(function (todos) {
          var todoItem = self.element.find('app-todo').first();
          var scope = todoItem.scope();
          scope.showSettingsMenu();
        });
      }
    }
  });
});