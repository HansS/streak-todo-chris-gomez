steal(
  'can',
  './landing.stache!',
  'can/map/define',
function (can, template) {

  var viewModel = can.Map({
    define: {

    }
  })

  return can.Component.extend({
    tag: 'landing-controller',
    template: template,
    scope: viewModel,
    events: {
      inserted: function () {

      }
    }
  });
});