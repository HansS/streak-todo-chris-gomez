steal(
  'can',
  './layout.stache!',
  'src/component/header',
  'src/component/form',
  'src/component/list',
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