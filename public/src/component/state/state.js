steal(
  'can',
  './state.stache!',
  'src/model/user.js',

  './state.less!',
  'src/component/header',
  'src/component/auth',
  'src/component/alerts',
  'src/component/form',
  'src/component/todos',
  'can/map/define',
function (can, template, UserModel) {

  var State = can.Map.extend({
    define: {
      alerts: {
        value: new can.List()
      },
      user: {
        value: new UserModel()
      }
    }
  });

  var state = window.state = new State();

  return can.Component.extend({
    tag: 'app-state',
    template: template,
    scope: state,
    events: {
      inserted: function () {

      }
    }
  });
});