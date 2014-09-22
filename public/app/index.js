steal(
  'can',
  './index.stache!',
  'app/model/state.js',

  'app/fixtures.js',
  'app/component/layout',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
function (can, indexView, State) {
  $(function () {
    var state = new State();
    window.state = state;
    var view = indexView(state);
    $('#stache').html(view);
  });
});