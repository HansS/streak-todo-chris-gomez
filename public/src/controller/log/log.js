steal(
  'can',
  'lodash',
  './log.stache!',
  'src/model/state.js',
  'src/model/todo.js',
  './log.less!',

  'src/component/date-nav',
  'src/component/form',
  'src/component/todos',
  'can/map/define',
  'can/list/promise',
function (can, _, template, state, TodoModel) {

  var ViewModel = can.Map.extend({
    define: {
      dueTodos: {
        value: new can.List()
      }
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

        // This should never happen.
        if (! userId) {
          throw "Cannot get a todo list without a user id.";
        }

        // Get all the todos for this user
        // TODO: Move this to the state model
        var allTodos = TodoModel.findAll({
          query: {
            match: {
              userId: userId
            }
          },
          sort: {
            createdAt: {
              order: 'desc'
            }
          }
        }).then(function (todos) {

          // Transfer the date over to the todos
          todos.each(function (todo) {
            todo.attr('relativeDate', self.scope.attr('date'));
          });

          return todos;
        });

        // Handle a failed findAll
        allTodos.fail(function () {
          state.alert('danger', 'Blast',
            'There was an error getting your todos. Cross your fingers ' +
            'and try again.');
        });

        state.attr('todos').replace(allTodos);
      }
    }
  });
});