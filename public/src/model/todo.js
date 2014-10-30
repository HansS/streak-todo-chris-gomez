steal(
  'can',
  'moment',
  'later',
  'lodash',
  'src/model/elasticsearch.js',
  'src/model/schedule.js',
  'src/utils/constants.js',

  'can/map/define',
function (can, moment, later, _, ElasticsearchModel, ScheduleModel, constants) {

  var TodoModel = ElasticsearchModel.extend({
    type: 'todo',
    shortName: 'TodoModel',

    // findAll: function () {
    //   var results = ElasticsearchModel.findAll.apply(this, arguments);
    //   results.then(function (todos) {
    //     console.log(todos)
    //   })
    //   return results;
    // }

  }, {

    define: {
      title: {
        serialize: true,
        type: 'string'
      },
      schedule: {
        serialize: true,
        Type: ScheduleModel,
        Value: ScheduleModel,
        value: function () {
          return new ScheduleModel();
        }
      },
      completeLog: {
        serialize: true,
        Type: can.Map,
        value: function () {
          return new can.Map();
        }
      },
      relativeDate: {
        serialize: false,
        value: function () {
          return moment();
        },
        set: function (value) {
          this.attr('schedule').attr('relativeDate', value);
          return value;
        }
      },
      /**
       * Gets the last scheduled occurance or created date.
       *
       * @return Date
       **/
      lastScheduledDate: {
        serialize: false,
        get: function () {
          var relativeDate = this.attr('relativeDate');
          var rawRelativeDate = relativeDate.toDate();

          console.log('relativeDate', relativeDate.toDate());

          // Get a Later instance from our schedule
          var schedule = later.schedule(this.attr('schedule.parsedPeriods'));

          // We'll define this later
          var lastScheduledDate = null;

          // If relativeDate is a valid date in the schedule..
          // NOTE: relativeDate is a Moment insance. Thus the toDate().
          if (schedule.isValid(rawRelativeDate)) {
            lastScheduledDate = rawRelativeDate;
          }

          // If there is a previous occurance in the schedule..
          else if (schedule.prev(1, rawRelativeDate)) {
            lastScheduledDate = schedule.prev(1, rawRelativeDate);
          }

          // If we haven't found a lastScheduledDate using the schedule, use the
          // createdAt time
          else {
            lastScheduledDate = moment(this.attr('createdAt')).toDate();
          }

          console.log('lastScheduledDate:', lastScheduledDate);

          return lastScheduledDate;
        }
      },
      state: {
        serialize: false,
        type: 'string',
        get: function () {

          var completeLog = this.attr('completeLog');
          var lastScheduledDate = this.attr('lastScheduledDate');

          // Convert the date to a slug
          var searchSlug = moment(lastScheduledDate)
            .format(constants.dateSlugFormat);

          // Search for the slug in the completedLog
          var completedEntry = this.attr('completeLog').attr(searchSlug);

          var state = completedEntry ? 'completed' : 'pending';

          console.log('state:', state);

          return state;
        },

        set: function (value) {
          var lastScheduledDate = moment(this.attr('lastScheduledDate'));
          var dateSlug = lastScheduledDate.format(constants.dateSlugFormat);
          var completeLog = this.attr('completeLog');

          if (value === 'completed') {
            completeLog.attr(dateSlug, 1);
          } else if (value === 'pending') {
            completeLog.removeAttr(dateSlug);
          }

          var state = this.attr('state');

          return state;
        }
      }
    }
  });

  return TodoModel;
});