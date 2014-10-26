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
        var self = this;

        this.modalEl = this.element.find('.modal');

        this.modalEl.modal({
          show: this.scope.attr('showModal')
        });

        this.modalEl.on('hidden.bs.modal', function () {
          self.scope.attr('showModal', false);
        });
      },

      '{scope} showModal': function (context, ev, value) {

        // We only control the showing of the modal with bindings. From
        // then on Bootrap takes over and we just update our bindings when
        // the modal is hidden.
        if (value) {
          this.modalEl.modal('show');
        }
      }
    }
  });

});