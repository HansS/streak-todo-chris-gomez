steal(
  'can',
  './user.js',
  'can/map/define',
  'jquery-cookie',
function (can, UserModel) {

  var syncValuesBlacklist = [
    'auth',
    'login',
    'signup',
    'logout'
  ];

  var syncValue = function (propertyToSync) {
    return function (newValue) {
      // If this value is not in the blacklist...
      // And, its value doesn't already match,
      // synchronize it.
      if (syncValuesBlacklist.indexOf(newValue) === -1 &&
          this.attr(propertyToSync) !== newValue) {
        this.attr(propertyToSync, newValue);
      }

      return newValue;
    };
  };

  var State = can.Map.extend({
    define: {
      context: {
        serialize: true,
        // set: syncValue('template')
      },
      template: {
        serialize: true,
        // set: syncValue('context')
      },
      alerts: {
        serialize: false,
        value: new can.List()
      },
      user: {
        serialize: false,
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

  return state;

});