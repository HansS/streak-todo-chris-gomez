steal(
  'can',
  './todo.stache!',
  'lodash',

  './todo.less!',
  'can/map/define',
function (can, template, _) {

  var ViewModel = can.Map.extend({
    define: {
    },
    showSettingsMenu: function () {
      var self = this;
      var modal = this.attr('modal');

      modal.attr({
        show: true,
        content: {
          script: 'src/component/todo/settings/',
          template: '<todo-settings todo="{.}"></todo-settings>',
          scope: this.attr('todo')
        }
      });

      var onSettingsComplete = _.once(function () {
        var isSaved = modal.attr('confirmed');

        if (isSaved) {
          self.attr('todo').save();
        } else {
          // TODO: Get a copy from the server
        }

        modal.unbind('show', onSettingsComplete);
      });

      modal.bind('show', onSettingsComplete);
    },

  });

  return can.Component.extend({
    tag: 'app-todo',
    template: template,
    scope: ViewModel,
    events: {

    }
  });
});