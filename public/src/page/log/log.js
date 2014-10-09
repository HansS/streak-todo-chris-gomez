steal(
  'can',
  './log.stache!',
  './log.less!',
  'can/map/define',
function (can, template, TodoModel) {

  var ViewModel = can.Map.extend({
    define: {
    }
  });

  return can.Component.extend({
    tag: 'log-page',
    template: template,
    scope: ViewModel,
    events: {
    }
  });
});