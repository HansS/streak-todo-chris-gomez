steal(
  'can',
  'lodash',
  './action.stache!',

  './action.less!',
  'can/map/define',
function (can, _, template) {

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
    }
  });

  return can.Component.extend({
    tag: 'app-action',
    template: template,
    scope: ViewModel,
    events: {

    }
  });
});