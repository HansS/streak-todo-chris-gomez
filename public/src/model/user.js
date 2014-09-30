steal(
  'can',
  'src/model/elasticsearch.js',
  './todo.js',
  'can/map/define',
function (can, ElasticsearchModel, TodoModel) {
  return ElasticsearchModel.extend({

    // Static methods

    type: 'user',


  }, {

    // Instance methods
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