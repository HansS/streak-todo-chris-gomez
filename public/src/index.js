steal(
  'can',
  'src/model/state.js',
  './router.js',
  'src/component/layout',

  // Question: Why can't I move this to stealconfig like this?
  //  meta: { 'src/index': deps: [ ... ]}
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
function (can, state, Router) {
  $(function () {

    var layoutView = can.stache('<app-layout></app-layout>');
    $('#stache').html(layoutView);

    new Router(state, $('main'));
  });
});