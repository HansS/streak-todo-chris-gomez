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
      '{scope} date': 'updateTodoList',

      inserted: function () {
        var self = this;

        // Get things rolling.
        var todoList = this.updateTodoList();

        // DEV: Open the first todo's settings
        /*todoList.then(function (todos) {
          var todoItem = self.element.find('app-todo').first();
          var scope = todoItem.scope();
          scope.showSettingsMenu();
        });*/
      },

      updateTodoList: function () {
        var self = this;
        var userId = state.attr('user').attr('_id');
        var date = this.scope.attr('date');

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

        // Filter out all todos that aren't relevant for this date
        // var todosForDate = allTodos.then(
        //   TodoModel.makeFilterByPending(date));
        var todosForDate = allTodos;

        // Handle a failed findAll
        todosForDate.fail(function () {
          state.alert('danger', 'Blast',
            'There was an error getting your todos. Cross your fingers ' +
            'and try again.');
        });

        // Use todosForDate in the app
        state.attr('todos').replace(todosForDate);

        // Return the deferred in case it's useful elsewhere
        return todosForDate;
      }
    },
  });
});