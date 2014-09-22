steal(
  'can',
  './todos.js',
  'can/map/define',
function (can, TodosModel) {
  return can.Model.extend({

    // Static methods

  }, {

    // Instance methods
    define: {
      todos: {
        value: new TodosModel.List()
      }
    }
  });
});