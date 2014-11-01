steal(
  'can',
  'lodash',
  'later',
  'moment',

  // An hour wasted because I forgot this!
  'can/map/define',
function (can, _, later, moment) {

  var ScheduleModel = can.Map.extend({
    // init: function () {
    //   console.log('Schedule Map Created! Go home!', this.attr());
    // },
    define: {

      // Periods
      dayOfMonth: {
        serialize: true,
        type: 'string',
        value: function () {
          return later.day.val(new Date());
        }
      },
      month: {
        serialize: true,
        type: 'string',
        value: function () {
          return later.month.val(new Date());
        }
      },
      dayOfWeek: {
        serialize: true,
        type: 'string',
        value: function () {
          // Later.js reports the days of the week from Sun:1, to Sat:0/7.
          // Cron expects Sun:0/7, to Saturday 6.
          // So if you feed Later.js' dayOfWeek directly into its cron parser,
          // it will be off by 1. To account for this, we simply subtract 1.
          // return later.dayOfWeek.val(new Date()) - 1;
          return '*';
        }
      },
      year: {
        serialize: true,
        type: 'string',
        // set: function (value) { console.log(value); return value; },
        value: function () {
          return later.year.val(new Date());
        }
      },

      // Meta
      concatenatedPeriods: {
        serialize: true,
        type: 'string',
        get: function () {
          var cronParts = ['*', '*'];
          var cronString = null;

          cronParts.push(this.attr('dayOfMonth'));
          cronParts.push(this.attr('month'));
          cronParts.push(this.attr('dayOfWeek'));
          cronParts.push(this.attr('year'));

          cronString = cronParts.join(' ');

          return cronString;
        }
      },
      parsedPeriods: {
        serialize: true,
        type: 'object',
        get: function () {
          var cronString = this.attr('concatenatedPeriods');
          var laterInstance = later.parse.cron(cronString);

          // Strip methods before serializing
          var schedules = {
            schedules: laterInstance.schedules,
            exceptions: laterInstance.exceptions
          };

          return schedules;
        }
      },
      upcommingDates: {
        serialize: false,
        Type: can.List,
        // Value: can.List,
        get: function () {
          var parsedPeriods = this.attr('parsedPeriods');
          var occurances = later.schedule(parsedPeriods)
            .next(5, this.attr('relativeDate'));
          var dates = [];

          _.each(occurances, function (occurance) {
            var m = moment(occurance);
            var date = m.format('MM-DD-YYYY');
            dates.push(date);
          });

          return dates;
        }
      }
    }
  });

  return ScheduleModel;

});