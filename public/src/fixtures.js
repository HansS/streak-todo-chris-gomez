steal(
  'can',
  'can/util/fixture',
function (can) {

  var todos = [
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
  ];

  can.fixture('GET /todo', function () {
    return {
      todos: todos
    };
  });

  can.fixture('POST /todo', function () {
    return {
      id: Math.floor( Math.random()*10000 )
    }
  });


});