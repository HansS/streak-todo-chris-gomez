steal(
  'can',
  'can/util/fixture',
function (can) {

  var actions = window.actions = [
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

  can.fixture('GET /action', function () {
    return {
      actions: actions
    };
  });

  can.fixture('POST /action', function (request) {
    var model = request.data;
    window.actions.push(model);
    return model;
  });


});