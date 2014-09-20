steal(
  'can',
  './index.stache!',
  'app/model/state.js',

  'app/component/layout',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
function (can, indexView, State) {
  $(function () {
    $('#stache').html(indexView(new State({})));
  });
});