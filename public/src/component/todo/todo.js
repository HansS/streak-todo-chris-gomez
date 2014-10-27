steal(
  'can',
  './todo.stache!',
  './todo.less!',
  'can/map/define',
function (can, template) {

  var ViewModel = can.Map.extend({
    define: {
    },
    showEditMenu: function () {
      this.attr('modal').attr({
        show: true,
        title: this.attr('todo').attr('title'),
        content: {
          script: 'src/component/todo/settings/',
          template: '<todo-settings></todo-settings>',
          scope: this.attr('todo')
        }
      });
    }
  });

  return can.Component.extend({
    tag: 'app-todo',
    template: template,
    scope: ViewModel,
    events: {

    }
  });
});