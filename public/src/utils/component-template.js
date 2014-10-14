steal('can',
  './template.stache!',
  function (can, template) {

  return can.Component.extend({
    tag: 'app-',
    template: template,
    scope: ViewModel,
    events: {
      inserted: function () {

      }
    }
  });

});