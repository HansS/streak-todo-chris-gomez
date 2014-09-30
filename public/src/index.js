steal(
  'can',
  'src/component/state',
  // Question: Why can't I move this to stealconfig like this?
  //  meta: { 'src/index': deps: [ ... ]}
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
function (can, indexView) {
  $(function () {
    var view = can.stache('<app-state></app-state>');
    $('#stache').html(view);
  });
});