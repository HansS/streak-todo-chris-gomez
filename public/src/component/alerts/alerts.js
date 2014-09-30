steal(
  'can',
  './alerts.stache!',
  'can/map/define',
function (can, template) {

  var ViewModel = can.Map.extend({
    define: {
      alerts: {
        Type: can.List
      }
    },

    // I think this goes here because the map is what's passed to the
    // mustache/stache template
    dismissAlert: function (alertMap, el, ev) {
      var alertsList = this.attr('alerts');
      var alertMapIndex = alertsList.indexOf(alertMap);
      alertsList.splice(alertMapIndex, 1);
    }
  });

  return can.Component.extend({
    tag: 'app-alerts',
    template: template,
    scope: ViewModel,
    events: {
      init: function () {

      },

      inserted: function () {

      },

      shiftAlertAfterInterval: function () {
        var self = this;

        setTimeout(function () {

          var alertList = self.scope.attr('alerts');

          alertList.splice(0, 1);

          if (alertList.length !== 0) {
            self.shiftAlertAfterInterval();
          }

        }, 5000);

      },

      '{scope.alerts} add': 'shiftAlertAfterInterval'
    }
  });
});