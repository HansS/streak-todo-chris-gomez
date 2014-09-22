steal(
  'can',
  './header.stache!',
function (can, template) {

  return can.Component.extend({
    tag: 'app-header',
    template: template,
    events: {
      init: function () {

      },
      inserted: function () {

      }
    }
  });
});