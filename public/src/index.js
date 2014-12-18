steal(
  'can',
  'src/model/state.js',
  './router.js',
  'src/component/layout',

  'bower_components/bootstrap/js/collapse.js',
  'bower_components/bootstrap/js/modal.js',
  'bower_components/bootstrap/js/transition.js',
function (can, state, Router) {
  $(function () {

    var layoutRenderer = can.stache('<app-layout></app-layout>');
    $('body').append(layoutRenderer(state));

    new Router(state, $('main'));
  });
});