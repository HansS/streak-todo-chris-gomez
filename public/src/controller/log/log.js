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
      '{scope} date': 'filterTodoList',

      inserted: function () {
        var self = this;
        var userId = state.attr('user').attr('_id');

        // This should never happen.
        if (! userId) {
          throw "Cannot get a todo list without a user id.";
        }

        // Get all the todos for this user
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
        });

        // Handle a failed findAll
        allTodos.fail(function () {
          state.alert('danger', 'Blast',
            'There was an error getting your todos. Cross your fingers ' +
            'and try again.');
        });

        state.attr('todos').replace(allTodos);

        this.filterTodoList();
      },

      filterTodoList: function () {
        var date = state.attr('date');
        var dueTodos = state.attr('todos').then(function (todos) {

          // Only show todos that are due
          todos = todos.filter(function (todo) {
            var lastCompletedTimestamp =
              todo.attr('lastScheduledDate').unix();
            var dateTimestamp = date.unix();

            return lastCompletedTimestamp <= dateTimestamp;
          });

          return todos;
        });

        this.scope.attr('dueTodos').replace(dueTodos);
      }
    }
  });
});