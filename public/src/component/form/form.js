steal(
  'can',
  './form.stache!',
  'src/model/todo.js',
  './form.less!',
  'can/map/define',
function (can, template, TodoModel) {

  var ViewModel = can.Map.extend({
    define: {
    },

    createTodo: function (context, el, ev) {

      // Get the todo input
      var input = el.find('[name="title"]');

      // Get the todo title
      var title = input.val();

      // Create a todo model
      var todoModel = new TodoModel({
        title: title,
        state: 'pending'
      });

      // Add the todo to the beginning of the todo list
      this.attr('todos').unshift(todoModel);

      // Persiste the model to the server
      todoModel.save();

      // Empty the input
      input.val('').trigger('change');

      // Don't submit the form
      ev.preventDefault();
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