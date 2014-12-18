steal(
  'can',
  './actions.stache!',

  './actions.less!',
  'src/component/action',
  'can/map/define',
function (can, template) {

  var ViewModel = can.Map.extend({
    define: {
    }
  });

  return can.Component.extend({
    tag: 'app-actions',
    template: template,
    scope: ViewModel,
    events: {
      init: function () {

      },
      inserted: function () {

      }
    },
    helpers: {
      isCompleted: function (action, options) {
        if (action.attr('state') === 'completed') {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      }
    }
  });
});