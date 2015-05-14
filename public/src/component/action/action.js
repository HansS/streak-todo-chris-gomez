steal(
  'can',
  'lodash',
  './action.stache!',
  'src/utils/constants.js',

  './action.less!',
  'can/map/define',
function (can, _, template, constants) {

  var ViewModel = can.Map.extend({
    define: {
      editing: {
        value: false
      }
    },
    showSettingsMenu: function () {
      var self = this;
      var modal = this.attr('modal');

      this.attr('action').backup();

      modal.attr({
        show: true,
        content: {
          script: 'src/component/action/settings/',
          template: '<action-settings action="{.}"></action-settings>',
          scope: this.attr('action')
        }
      });

      var onSettingsComplete = _.once(function () {
        var isSaved = modal.attr('confirmed');

        if (isSaved) {
          self.attr('action').save();
        } else {
          self.attr('action').revert();
        }

        modal.unbind('show', onSettingsComplete);
      });

      // Listen for when the modal is closed
      modal.bind('show', onSettingsComplete);
    },
    deleteAction: function () {
      this.attr('action').destroy();
    },
    toggleEditing: function () {
      if (this.attr('editing')) {
        this.attr('action').revert();
      } else {
        this.attr('action').backup();
      }

      this.attr('editing', ! this.attr('editing'));
    },
    updateAction: function (context, el, ev) {

      // Only proceed if enter key pressed
      if (ev.which !== 13) {
        return;
      }

      // Stop from rendering the newline
      ev.preventDefault();

      var title = el.val();

      this.attr('action.title', title);
      this.attr('action').save();
    }
  });

  return can.Component.extend({
    tag: 'app-action',
    template: template,
    scope: ViewModel,
    events: {
    },
    helpers: {
      renderTitle: function (title) {
        // var attnRegex = /(^|[^@\w])(@\w+?)\b/g;
        // var hashRegex = /(^|[^#\w])(#\w+?)\b/g;
        var attnRegex = /(\@(\w|-)+)/g;
        var hashRegex = /(\#(\w|-)+)/g;

        title = (title.isComputed ? title() : title);
        title = title.replace(attnRegex, '<a href="/search/$1">$1</a>');
        title = title.replace(hashRegex, '<a href="/search/$1">$1</a>');

        return title;
      }
    }
  });
});