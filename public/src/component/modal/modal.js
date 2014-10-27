steal('can',
  './modal.stache!',
  './modal.less!',
  'can/map/define',
  function (can, template) {

  var ViewModel = can.Map.extend({
    define: {
      content: new can.Map({})
    }
  });

  return can.Component.extend({
    tag: 'app-modal',
    template: template,
    scope: ViewModel,
    events: {
      '{scope} modal.show': 'showModal',
      '{scope} modal.content.script': 'renderContent',

      inserted: function () {
        var self = this;

        this.modalEl = this.element.find('.modal');

        this.modalEl.modal({
          show: this.scope.attr('modal').attr('show')
        });

        this.modalEl.on('hidden.bs.modal', function () {
          self.scope.attr('modal').attr('show', false);
        });

        if (this.scope.attr('modal').attr('content').attr('script') !== '') {
          this.renderContent();
        }
      },

      showModal: function (context, ev, value) {

        // We only control the showing of the modal with bindings. From
        // then on Bootrap takes over and we just update our bindings when
        // the modal is hidden.
        if (value) {
          this.modalEl.modal('show');
        }
      },

      renderContent: function (context, ev) {
        var content = this.scope.attr('modal').attr('content');
        var script = content.attr('script');
        var template = content.attr('template');
        var scope = content.attr('scope');
        var contentEl = this.modalEl.find('.modal-body');

        System.import(script).then(function() {

          // Check that this script is still relevant. The script may
          // have changed since we started loading it.
          if (script !== content.attr('script')) {
            console.log('Modal: Aborting render of', template);
            return;
          }

          console.log('Modal: Rendering..', template);

          // Insert the component HTML tag
          var fragment = can.stache(template)(scope);
          contentEl.html(fragment);
        });


      }
    }
  });

});