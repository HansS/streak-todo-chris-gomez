steal(
  'can',
  'can/map/define',
function (can) {

  return can.Model.extend({

    // Static methods

    // parseModels: 'todos',
    create: "POST /todo",
    findAll: "GET /todo",
    findOne: "GET /todo/{id}"

  }, {

    // Instance methods

    define: {

    }
  });
});