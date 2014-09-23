steal(
  'can',
  'can/map/define',
function (can) {

  var Todo = can.Model.extend({

    // Static methods

    parseModels: 'todos',
    create: "POST /todo",
    findAll: "GET /todo",
    findOne: "GET /todo/{id}",

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