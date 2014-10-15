steal(
  'can',
  './form.stache!',
  'src/model/state.js',
  'src/model/todo.js',
  './form.less!',
  'can/map/define',
function (can, template, state, TodoModel) {

  var ViewModel = can.Map.extend({
    define: {
    },

    createTodo: function (context, el, ev) {

      // Don't submit the form
      ev.preventDefault();

      // Get the todo input
      var input = el.find('[name="title"]');

      // Get the todo title
      var title = input.val();

      // Create a todo model
      var todoModel = new TodoModel({
        user_id: state.attr('user').attr('_id'),
        title: title,
        state: 'pending',
        created_at: new Date()
      });

      // Add the todo to the beginning of the todo list
      // TODO: Don't rely on unshift. Sort Todo.List by created date/time
      this.attr('todos').unshift(todoModel);

      // Persist the model to the server
      todoModel.save();

      // Empty the input
      input.val('').trigger('change');


    }
  });

  return can.Component.extend({
    tag: 'app-form',
    template: template,
    scope: ViewModel,
    events: {

    }
  });
});