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
        this.onDocumentClick = can.proxy(this.blurNavCollapse, this);
      },

      '.navbar-collapse show.bs.collapse': function () {
        $(document).on('click', this.onDocumentClick);
      },

      '.navbar-collapse hide.bs.collapse': function () {
        $(document).off('click', this.onDocumentClick);
      },

      // If any link in the header is clicked, attempt to close the
      // collapse menu
      'a click': function () {
        this.hideNavCollapse();
      },

      // If the collapse menu is opened, close it.
      // Note: This can't be run regardless of open/closed because
      // there is a bug in Bootstrap where calling "hide" opens the menu
      hideNavCollapse: function () {
        if (this.element.find('.navbar-collapse').hasClass('in')) {
          this.element.find('.navbar-collapse').collapse('hide');
        }
      },

      blurNavCollapse: function (ev) {
        var tagName = this.element.prop('tagName').toLowerCase();
        var clickedEl = ev.target;
        var isChildOfHeader = $(clickedEl).parents(tagName).length;

        if (! isChildOfHeader) {
          this.hideNavCollapse();
        }
      }
    }
  });
});