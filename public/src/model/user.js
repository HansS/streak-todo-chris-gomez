steal(
  'can',
  'src/model/elasticsearch.js',
  './action.js',
  'can/map/define',
function (can, ElasticsearchModel, ActionModel) {
  return ElasticsearchModel.extend({

    // Static

    type: 'user'

  }, {

    // Instance

    define: {
      username: {
        type: 'string',
        value: ''
      },
      loggedIn: {
        serialize: false,
        type: 'boolean',
        value: false
      },
      actions: {
        serialize: false,
        Type: ActionModel.List
      }
    }
  });
});