steal(
  'can',
  'src/model/elasticsearch.js',
  './todo.js',
  'can/map/define',
function (can, ElasticsearchModel, TodoModel) {
  return ElasticsearchModel.extend({

    // Static

    type: 'user',

  }, {

    // Instance

    define: {
      username: {
        type: 'string',
        value: 'akagomez'
      },
      loggedIn: {
        serialize: false,
        type: 'boolean',
        value: false
      },
      todos: {
        serialize: false,
        Type: TodoModel.List,
        value: new TodoModel.List()
      }
    }
  });
});