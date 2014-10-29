steal(
  'can',
  'src/model/elasticsearch.js',
  'src/model/schedule.js',
  'moment',
  'later',
  'lodash',

  'can/map/define',
function (can, ElasticsearchModel, ScheduleModel, moment, later, _) {

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
      }
    }

  });

  return TodoModel;
});