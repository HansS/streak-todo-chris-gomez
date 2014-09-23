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
      var title = el.find('[name="title"]').val();

      var todoModel = new TodoModel({
        title: title,
        state: 'pending'
      });

      this.attr('todos').unshift(todoModel);

      todoModel.save();

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