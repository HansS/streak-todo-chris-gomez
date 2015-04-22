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
        var usernameRegex = /(^|[^@\w])(@\w+?)\b/g;
        var hashtagRegex = /(^|[^#\w])(#\w+?)\b/g;

        title = (title.isComputed ? title() : title);
        title = title.replace(usernameRegex, '$1<a href="">$2</a>');
        title = title.replace(hashtagRegex, '$1<a href="">$2</a>');

        return title;
      }
    }
  });
});