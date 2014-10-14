steal(
  'can',
  './layout.stache!',
  'src/model/state.js',
  'src/model/user.js',

  './layout.less!',
  'src/component/header',
  'src/component/alerts',
  'can/map/define',
function (can, template, viewModel, UserModel) {

  return can.Component.extend({
    tag: 'app-layout',
    template: template,
    scope: viewModel,
    events: {
      inserted: function () {
        this.ignoreJavascriptLinks()
      },
      ignoreJavascriptLinks: function () {
        $('body').on('click', '[href="javascript://"]', function (ev) {
          ev.preventDefault();
        });
      }
    }
  });
});