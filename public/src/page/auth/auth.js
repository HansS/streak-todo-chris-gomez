steal(
  'can',
  './auth.stache!',
  'src/model/state.js',
  'src/model/user.js',

  './auth.less!',
  'can/map/define',
  'jquery-cookie',
function (can, template, state, UserModel) {

  var ViewModel = can.Map.extend({
    define: {
      username: {
        type: 'string',
        value: ''
      },
      context: {
        type: 'string',
        value: ''
      }
    },

    submit: function (context, el, ev) {
      ev.preventDefault();

      // Question: Should this logic be in the ViewModel?
      if (this.attr('context') === 'login') {
        this.login.apply(this, arguments);
      } else {
        this.signup.apply(this, arguments);
      }
    },

    login: function (context, el, ev) {
      var self = this;
      var username = this.attr('username');

      if (! username) {
        state.alert('info', 'Duh', 'You can\'t login without a username.');

        return;
      }

      var dfd = UserModel.findAll({
        query: {
          match: {
            username: username
          }
        }
      }).then(function (users) {

        // If no users were returned, this user probably doesn't have an
        // acount
        if (! users.length) {
          state.alert('info', 'Nah-uh',
            'That user doesn\'t exist. Are you sure you have an account?');
        }

        // Use the first one returned (we hope there was only one).
        var user = users.shift();
        var userAttrs = user.attr();

        // Log em' in!
        $.cookie('auth_user', userAttrs._id);
        userAttrs.loggedIn = true;

        // Save the user's attributes
        self.attr('user').attr(userAttrs);

      }, function (err) {

        // Generic error message
        state.alert('danger', 'Darn',
          'We couldn\'t log you in. Try again.');

        throw err;
      });
    },

    signup: function (context, el, ev) {
      var self = this;
      var username = this.attr('username');

      if (! username) {
        state.alert('info', 'Duh',
          'You can\'t signup without a username.');

        return;
      }

      var dfd = UserModel.findAll({
        query: {
          match: {
            username: username
          }
        }
      }).then(function (users) {

        if (users.length) {

          // User exists already
          state.alert('warning', 'Sorry',
            'That username is taken.');

          return;
        }

        self.attr('user').save()
          .done(function (response) {

            // Don't make the user login also
            self.attr('user').attr('loggedIn', true);

          })
          .fail(function (err) {

            // Generic error message
            state.alert('danger', 'Shoot',
              'The server didn\'t save your username. Try again.');

            throw err;

          });

      }, function (err) {
        console.log(arguments)
        throw err;
      });
    }
  });

  return can.Component.extend({
    tag: 'auth-page',
    template: template,
    scope: ViewModel,
    events: {
      inserted: function () {
        var self = this;

        // setTimeout(function () {
        //   self.element.find('form').trigger('submit');
        // }, 1000);
      }
    },
    helpers: {
      isLoginContext: function (options) {
        if (this.attr('context') === 'login') {
          return options.fn();
        } else {
          return options.inverse();
        }
      },
      isSignupContext: function (options) {
        if (this.attr('context') === 'signup') {
          return options.fn();
        } else {
          return options.inverse();
        }
      }
    }
  });
});