steal('can',
  './settings.stache!',
  'src/utils/constants.js',

  './settings.less!',
  'can/map/define',
  function (can, template, constants) {

  var ViewModel = can.Map.extend({
    define: {

    }
  });

  return can.Component.extend({
    tag: 'todo-settings',
    template: template,
    scope: ViewModel,
    events: {
      inserted: function () {

      }
    },
    helpers: {
      formatDate: function (slug) {
        var m = moment(slug, constants.dateSlugFormat);
        return m.format('dddd, MMM. Do, YYYY');
      }
    }
  });

});