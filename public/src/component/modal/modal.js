steal('can',
  './modal.stache!',
  './modal.less!',
  'can/map/define',
  function (can, template) {

  var ViewModel = can.Map.extend({
    define: {

    }
  });

  return can.Component.extend({
    tag: 'app-modal',
    template: template,
    scope: ViewModel,
    events: {
      inserted: function () {

      }
    }
  });

});