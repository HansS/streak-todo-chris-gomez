steal(
  'can',
  './index.stache!',
  'src/model/state.js',
  'src/component/layout',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
function (can, indexView, State) {
  $(function () {
    var state = window.state = new State();

    console.log(state.attr('user').attr('todos').attr());

    var view = indexView(state);

    $('#stache').html(view);
  });
});