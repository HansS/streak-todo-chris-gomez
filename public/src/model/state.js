steal(
  'can',
  './user.js',
  './todo.js',
  'can/map/define',
  'jquery-cookie',
function (can, UserModel, TodoModel) {

  var syncValuesBlacklist = [
    'auth',
    'login',
    'signup',
    'logout'
  ];

  var requireAuth = [
    'log'
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
      authenticated: {
        serialize: false,
        type: 'boolean',
        value: false,
        get: function () {
          return (!!($.cookie('auth_user')) || this.attr('user').attr('_id'));
        }
      },
      action: {
        serialize: true,
        type: 'string'
      },
      controller: {
        serialize: true,
        type: 'string'
      },
      returnUrl: {
        serialize: true,
        type: 'string'
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

          userModel.attr({
            _id: authUserId
          });

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
      },
      todos: {
        serialize: false,
        value: new TodoModel.List()
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