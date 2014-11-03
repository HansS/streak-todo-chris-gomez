steal(
  'can',
  './user.js',
  './todo.js',
  'src/utils/constants.js',

  'can/map/define',
  'jquery-cookie',
function (can, UserModel, TodoModel, constants) {

  var State = can.Map.extend({
    define: {
      authenticated: {
        serialize: false,
        type: 'boolean',
        value: false,
        get: function () {
          return (!!($.cookie('authUser')) || this.attr('user').attr('_id'));
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
      alerts: {
        serialize: false,
        value: new can.List()
      },
      user: {
        serialize: false,
        value: function () {
          var self = this;
          var userModel = new UserModel();
          var authUserId = $.cookie('authUser');

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

              // Log message
              console.log(err.stack);

              // Notify user
              self.alert('danger', 'Oh no',
                'We can\'t find your your user info. Try logging in again.');

              // Redirect
              self.attr({
                controller: 'auth',
                action: 'login'
              })
            });
          }

          return userModel;
        }
      },
      todos: {
        serialize: false,
        value: new TodoModel.List()
      },
      modal: {
        serialize: false,
        value: new can.Map({
          show: false,
          title: 'Settings',
          confirmed: false,
          content: new can.Map({
            script: '',
            template: '',
            scope: new can.Map({})
          })
        })
      },
      date: {
        serialize: false,
        value: function () {
          var m = moment()
            .milliseconds(0)
            .seconds(0)
            .minute(0)
            .hour(0);
        },
        set: function (value) {
          // Set the time to 0
          value.milliseconds(0)
            .seconds(0)
            .minute(0)
            .hour(0);

          this.attr('todos').each(function (todo) {
            todo.attr('relativeDate', value);
          });

          return value;
        }
      },
      dateSlug: {
        serialize: true,
        type: 'string',
        set: function (slug) {
          var m;
          var currentDateSlug =
            moment(new Date()).format(constants.dateSlugFormat);

          if (slug !== '') {
            m = moment(slug, constants.dateSlugFormat);
          } else {
            m = moment(new Date());
          }

          // Update the date
          this.attr('date', m);

          // Regardless of input, we'll have a slug here
          slug = m.format(constants.dateSlugFormat);

          if (slug === currentDateSlug) {
            return '';
          }

          return slug;
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