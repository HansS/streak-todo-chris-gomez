steal(
  'can',
  './todo.js',
  'can/map/define',
function (can, TodoModel) {
  return can.Model.extend({

    // Static methods

  }, {

    // Instance methods
    define: {
      todos: {
        // Passing {} is like calling .findAll()
        value: new TodoModel.List({})
      }
    }
  });
});