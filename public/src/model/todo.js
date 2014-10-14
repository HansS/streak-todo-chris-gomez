steal(
  'can',
  'lodash',
  'src/model/elasticsearch.js',

  'can/map/define',
function (can, _, ElasticsearchModel) {
  var Todo = ElasticsearchModel.extend({

    // Static methods

    type: 'todo'

  }, {

    // Instance methods

    define: {

    }

  });

  Todo.List = Todo.List.extend({
  });

  return Todo;
});