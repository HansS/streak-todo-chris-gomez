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
       * @return Moment instance
       **/
      lastScheduledDate: {
        serialize: false,
        get: function () {
          var relativeDate = this.attr('relativeDate');

          // Get a Later instance from our schedule
          var schedule = later.schedule(this.attr('schedule.parsedPeriods'));

          // We'll define this later
          var lastScheduledDate = null;

          // Get the last scheduled date relative to the current date
          var lastOccurance = schedule.prev(1, relativeDate.toDate());

          // If relativeDate is a valid date in the schedule..
          if (schedule.isValid(relativeDate.toDate())) {
            lastScheduledDate = relativeDate;
          }

          // If there is a previous occurance in the schedule..
          else if (lastOccurance) {
            lastScheduledDate = moment(lastOccurance);
          }

          // If we haven't found a lastScheduledDate using the schedule, use
          // the createdAt time.
          else {
            lastScheduledDate = moment(this.attr('createdAt'));
          }

          // Change the time to the beginning of the day
          lastScheduledDate
            .milliseconds(0)
            .seconds(0)
            .minute(0)
            .hour(0);

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

          return state;
        },

        set: function (value) {
          var relativeDate = this.attr('relativeDate');
          var lastScheduledDate = this.attr('lastScheduledDate');
          var completeLog = this.attr('completeLog');

          if (value === 'completed') {

            // Convert the lastScheduledDate to a slug
            var dateSlug = lastScheduledDate.format(constants.dateSlugFormat);

            // Add the slug to the completeLog
            completeLog.attr(dateSlug, 1);

          } else if (value === 'pending') {

            var relativeTimestamp = relativeDate.unix();
            var lastScheduledTimestamp = lastScheduledDate.unix();

            // There may be dateSlug's in the completeLog that fall between
            // the relativeDate and the lastScheduledDate if the user has
            // made the schedule less frequent after having completed the todo
            // many times while it was more frequent. To account for this we
            // need to remove all the dateSlug's in the completedLog between
            // the relativeDate and the lastScheduledDate. We can't just
            // remove the last completedLog.
            // NOTE: This dateSlug may not be in the completeLog if
            // the lastScheduledDate falls back createdAt date.
            completeLog.each(function (offset, completedDateSlug) {

              // Convert the date slug to a time object that we can compare
              // against relativeDate and lastScheduled.
              var completedTimestamp =
                moment(completedDateSlug, constants.dateSlugFormat).unix();


              if ((lastScheduledTimestamp <= completedTimestamp) &&
                  (completedTimestamp <= relativeTimestamp)) {
                completeLog.removeAttr(completedDateSlug);
              }

            });
          }

          return value;
        }
      }
    }
  });

  return TodoModel;
});