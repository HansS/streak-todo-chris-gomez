steal(
  'can',
  'lodash',
  './action.stache!',
  'src/utils/constants.js',

  './action.less!',
  'can/map/define',
function (can, _, template, constants) {

  var ViewModel = can.Map.extend({
    define: {
      isEditing: {
        value: false
      }
    },
    showSettingsMenu: function () {
      var self = this;
      var modal = this.attr('modal');

      this.attr('action').backup();

      modal.attr({
        show: true,
        content: {
          script: 'src/component/action/settings/',
          template: '<action-settings action="{.}"></action-settings>',
          scope: this.attr('action')
        }
      });

      var onSettingsComplete = _.once(function () {
        var isSaved = modal.attr('confirmed');

        if (isSaved) {
          self.attr('action').save();
        } else {
          self.attr('action').revert();
        }

        modal.unbind('show', onSettingsComplete);
      });

      // Listen for when the modal is closed
      modal.bind('show', onSettingsComplete);
    },
    deleteAction: function () {
      this.attr('action').destroy();
    },
    toggleEditing: function () {
      if (this.attr('isEditing')) {
        this.attr('action').revert();
      } else {
        this.attr('action').backup();
      }

      this.attr('isEditing', ! this.attr('isEditing'));
    },
    updateOrRevert: function (context, el, ev) {

      var enterKeyPressed = ev.which === 13;
      var escKeyPressed = ev.which === 27;

      // Only proceed if enter key pressed
      if (! enterKeyPressed && ! escKeyPressed) {
        return;
      } else if (enterKeyPressed) {
        // Stop from rendering the newline
        ev.preventDefault();

        var title = el.val();

        this.attr('action.title', title);
        this.attr('action').save();
      } else if (escKeyPressed) {
        this.attr('action').revert();
      }

      this.attr('isEditing', false);
    }
  });

  return can.Component.extend({
    tag: 'app-action',
    template: template,
    scope: ViewModel,
    events: {
      onDocumentClick: function (ev) {
        var isNotChild = $(this.element).has(ev.target).length
          ? false
          : true;

        if (isNotChild) {
          this.scope.attr('action').revert();
          this.scope.attr('isEditing', false);
        }
      },

      '{scope} isEditing': function (context, ev, isEditing) {
        var self = this;

        if (isEditing) {
          this._proxiedOnDocumentClick = can.proxy(this.onDocumentClick, this);

          // Wait, then add the click handler.
          // The event that triggered this isEditing change will bubble up
          // to the document soon after this method finishes executing.
          // When that happens, the clicked <div> that triggered this event
          // will be the ev.target but it will already be detached and
          // therefore appear not to be a child of this.element.
          _.defer(function () {
            $(document).on('click', self._proxiedOnDocumentClick);
          });
        } else {
          $(document).off('click', this._proxiedOnDocumentClick);
        }
      }
    },
    helpers: {
      renderTitle: function (title) {
        // var attnRegex = /(^|[^@\w])(@\w+?)\b/g;
        // var hashRegex = /(^|[^#\w])(#\w+?)\b/g;
        var attnRegex = /(\@(\w|-)+)/g;
        var hashRegex = /(\#(\w|-)+)/g;

        title = (title.isComputed ? title() : title);

        if (! title) {
          return '';
        }

        title = title.replace(attnRegex, '<a href="/search/$1">$1</a>');
        title = title.replace(hashRegex, '<a href="/search/$1">$1</a>');

        return title;
      }
    }
  });
});