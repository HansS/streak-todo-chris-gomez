steal(
  'can',
  'lodash',
  'can/map/define',
function (can, _) {

  var Todo = can.Model.extend({

    // Static methods

    // parseModels: 'todos',

    create: "POST /api/todo",
    findAll: "GET /api/todo/_search",
    // findOne: "GET /todo/{id}",

    // makeFindAll: function (findAllData) {
    //   return function (params, success, error) {
    //     var self = this;

    //     params = {
    //       "query": {
    //           "match_all": {}
    //        }
    //     };

    //     var dfd = findAllData(params);

    //     return dfd.pipe(function (data) {
    //       var todos = data.hits.hits;
    //       todos = _.pluck(todos, '_source');
    //       return self.models(todos);
    //     });
    //   }
    // }

  }, {

    // Instance methods

    define: {
      isCompleted: {
        get: function () {
          return this.attr('state') == 'completed';
        }
      }
    }
  });

  Todo.List = Todo.List.extend({

  });

  return Todo;
});