steal(
  'can',
  'can/util/fixture',
function (can) {

  can.fixture('GET /todo', function () {
    return {
      todos: [
        {
          title: 'Finish this app',
          state: 'pending'
        },
        {
          title: 'Eat all vitamins',
          state: 'pending'
        },
        {
          title: 'Make a presentation',
          state: 'pending'
        },
        {
          title: 'Procrastinate',
          state: 'completed'
        }
      ]
    };

  });

});