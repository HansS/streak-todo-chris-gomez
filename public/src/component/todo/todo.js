steal(
  'can',
  'lodash',
  './todo.stache!',

  './todo.less!',
  'can/map/define',
function (can, _, template) {

  var ViewModel = can.Map.extend({
    define: {
      isCompleted: {
        get: function () {
          var state = this.attr('todo').attr('state') === 'completed';

          return state ?
            true : false;
        },
        set: function (value) {
          var todo = this.attr('todo');

          todo.attr('state', (value ? 'completed' : 'pending'));

          todo.save();
        }
      }
    },
    toggleIsCompleted: function () {
      // Invert isCompleted
      this.attr('isCompleted', !this.attr('isCompleted'));
    },
    showSettingsMenu: function () {
      var self = this;
      var modal = this.attr('modal');

      this.attr('todo').backup();

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
          self.attr('todo').revert();
        }

        modal.unbind('show', onSettingsComplete);
      });

      // Listen for when the modal is closed
      modal.bind('show', onSettingsComplete);
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