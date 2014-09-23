steal(
  'can',
  './index.stache!',
  'src/model/state.js',
  'src/component/layout',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
function (can, indexView, StateModel) {
  $(function () {
    var state = window.state = new StateModel();


    var view = indexView(state);

    $('#stache').html(view);
  });
});