steal(
  'can',
  './todos.stache!',

  './todos.less!',
  'can/map/define',
function (can, template) {

  var ViewModel = can.Map.extend({
    define: {
    },
    showEditMenu: function () {
      this.attr('showEditMenu', true);
    }
  });

  return can.Component.extend({
    tag: 'app-todos',
    template: template,
    scope: ViewModel,
    events: {
      init: function () {

      },
      inserted: function () {

      }
    }
  });
});