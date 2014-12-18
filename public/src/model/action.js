steal(
  'can',
  'moment',
  'later',
  'lodash',
  'src/model/elasticsearch.js',
  'src/utils/constants.js',
  'src/utils/remove-time-from-moment.js',

  'can/map/define',
function (can, moment, later, _, ElasticsearchModel, constants,
    removeTimeFromMoment) {

  var ActionModel = ElasticsearchModel.extend({
    type: 'action',
    shortName: 'ActionModel',

    // findAll: function () {
    //   var results = ElasticsearchModel.findAll.apply(this, arguments);
    //   results.then(function (actions) {
    //     console.log(actions)
    //   })
    //   return results;
    // }

  }, {

    define: {
      title: {
        serialize: true,
        type: 'string'
      }
    }
  });

  return ActionModel;
});