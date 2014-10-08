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

      '.navbar-collapse a click': function () {
        this.hideNavCollapse()
      },

      hideNavCollapse: function () {
        this.element.find('.navbar-collapse').collapse('hide');
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