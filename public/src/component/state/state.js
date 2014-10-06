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
  'jquery-cookie',
function (can, template, UserModel) {

  var State = can.Map.extend({
    define: {
      ready: {
        type: 'boolean',
        value: false
      },
      alerts: {
        value: new can.List()
      },
      user: {
        value: function () {
          var self = this;
          var userModel = new UserModel();
          var authUserId = $.cookie('auth_user');

          // If an authUserId is set, get the user model from the DB
          if (authUserId) {
            UserModel.findOne({
              '_id': authUserId
            }).then(function (model) {

              if (model) {
                // Copy the returned model attrs to our userModel
                userModel.attr(model.attr());

                // Log em' in!
                userModel.attr('loggedIn', true);
              }

              self.attr('ready', true);
            }, function (err) {
              console.log(err.stack);
            });
          }

          return userModel;
        }
      }
    },
    alert: function (type, heading, message) {
      this.attr('alerts').push({
        type: type,
        heading: heading,
        message: message
      });
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