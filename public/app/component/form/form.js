steal(
  'can',
  './form.stache!',
  'can/map/define',
function (can, template) {

  var ViewModel = can.Map.extend({
    define: {
      todos: new can.Map({
        value: [
          {
            title: 'Take out the trash'
          }
        ]
      })
    },

    createTodo: function (context, el, ev) {
      var title = el.find('[name="title"]').val();

      this.attr('todos').push({
        title: title
      });

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