steal('can',
  './modal.stache!',
  './modal.less!',
  'can/map/define',
  function (can, template) {

  var ViewModel = can.Map.extend({
    define: {

    },
    confirm: function (context, el, ev) {
      ev.preventDefault();

      this.attr('modal').attr({
        confirmed: true,
        show: false
      });
    },
    reset: function () {
      this.attr('modal').attr({
        confirmed: false
      })
    }
  });

  return can.Component.extend({
    tag: 'app-modal',
    template: template,
    scope: ViewModel,
    events: {
      '{scope} modal.show': 'respondToShowToggle',
      '{scope} modal.content.script': 'renderContent',

      inserted: function () {
        var self = this;
        var modalMap = self.scope.attr('modal');

        this.modalEl = this.element.find('.modal');

        this.modalEl.modal({
          show: this.scope.attr('modal').attr('show')
        });

        this.modalEl.on('hidden.bs.modal', function () {
          modalMap.attr('show', false);
        });

        if (modalMap.attr('content').attr('script') !== '') {
          this.renderContent();
        }
      },

      respondToShowToggle: function (context, ev, value) {
        var modal = this.scope.attr('modal');

        this.modalEl.modal(value ? 'show' : 'hide');

        if (value) {
          this.scope.reset();
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