steal('can',
  './modal.stache!',
  './modal.less!',
  'can/map/define',
  function (can, template) {

  var ViewModel = can.Map.extend({
    define: {
      showModal: {
        type: 'boolean',
        value: false
      }
    }
  });

  return can.Component.extend({
    tag: 'app-modal',
    template: template,
    scope: ViewModel,
    events: {
      inserted: function () {
        this.modalEl = this.element.find('.modal');
      },

      // Modify the DOM on showModal toggle
      '{scope} showModal': function (ev, value) {
        $('body').toggleClass('modal-open', value);
      }
    }
  });

});