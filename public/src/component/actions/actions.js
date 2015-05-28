steal(
  'can',
  'moment',
  './actions.stache!',
  'src/utils/constants.js',

  './actions.less!',
  'src/component/action',
  'can/map/define',
function (can, moment, template, constants) {

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
      convertSlugToHumanReadableDate: function (dateSlug) {
        dateSlug = dateSlug.isComputed ? dateSlug() : dateSlug;

        var m = moment(dateSlug);
        var date = m.format(constants.date.format.human);

        return date;
      }
    }
  });
});