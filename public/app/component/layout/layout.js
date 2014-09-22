steal(
  'can',
  './layout.stache!',
  'app/component/header',
  'app/component/form',
  'app/component/list',
  'can/map/define',
function (can, template) {

  var ViewModel = can.Map.extend({
    define: {
    }
  });

  return can.Component.extend({
    tag: 'app-layout',
    template: template,
    scope: ViewModel,
    events: {
      init: function () {

      },
      inserted: function () {
        console.log(this.scope.attr('user'));
      }
    }
  });
});