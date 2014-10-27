steal('can',
  './date-nav.stache!',

  './date-nav.less!',
  'can/map/define',
  function (can, template) {

  var ViewModel = can.Map.extend({
    define: {

    },
    goBackOneDay: function () {
      var d = this.attr('date').clone();
      this.attr('date', d.subtract(1, 'days'));
    },
    goForwardOneDay: function () {
      var d = this.attr('date').clone();
      this.attr('date', d.add(1, 'days'));
    }
  });

  return can.Component.extend({
    tag: 'app-date-nav',
    template: template,
    scope: ViewModel,
    events: {
      inserted: function () {

      }
    },
    helpers: {
      formatDate: function (date) {
        // TODO: Find out why I have to call this
        var m = date();
        // Monday, Oct. 27th, 2014
        return m.format('dddd, MMM. Do, YYYY');
      }
    }
  });

});