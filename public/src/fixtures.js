steal(
  'can',
  'can/util/fixture',
function (can) {

  can.fixture('GET /todo', function () {
    console.log('GET /todo');
    return {
      todos: [
        {
          title: 'Finish this app!'
        },
        {
          title: 'Finish this app Now!'
        }
      ]
    };

  });

});