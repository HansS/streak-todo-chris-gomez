steal(
  'can',
  './todo.stache!',
  './todo.less!',
  'can/map/define',
function (can, template) {

  var ViewModel = can.Map.extend({
    define: {

    }
  });

  return can.Component.extend({
    tag: 'app-todo',
    template: template,
    scope: ViewModel,
    events: {

    }
  });
});