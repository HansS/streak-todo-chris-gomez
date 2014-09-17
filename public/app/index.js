steal(
  'can',
  'app/index.stache!',
  'app/component/layout',
function (can, indexView) {
  $(function () {
    $('#stache').html(indexView());
  });
});