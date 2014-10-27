steal(
  'can',
  'lodash',
  'src/model/elasticsearch.js',
  'moment',

  'can/map/define',
function (can, _, ElasticsearchModel, moment) {
  var Todo = ElasticsearchModel.extend({

    // Static methods

    type: 'todo',

    shortName: 'TodoModel'

  }, {

    // Instance methods

    define: {
      schedule: {
        serialize: true,
        value: function () {
          var m = moment();
          return new Schedule({
            day_of_week: m.day(),
            week_of_month: Math.ceil(m.date() / 7),
            day_of_month: m.date(),
            month: m.month(),
            year: m.year()
          });
        }
      }
    }

  });

  Todo.List = Todo.List.extend({

  });

  var Schedule = can.Map.extend({
    define: {
      day_of_week: {
        type: 'string'
      },
      week_of_month: {
        type: 'string'
      },
      day_of_month: {
        type: 'string'
      },
      month: {
        type: 'string'
      },
      year: {
        type: 'string'
      }
    }
  });

  return Todo;
});