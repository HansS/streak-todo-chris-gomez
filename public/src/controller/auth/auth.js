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
      action: {
        type: 'string',
        value: ''
      }
    },

    submit: function (action, el, ev) {
      ev.preventDefault();

      // Question: Should this logic be in the ViewModel?
      if (this.attr('action') === 'login') {
        this.login.apply(this, arguments);
      } else {
        this.signup.apply(this, arguments);
      }
    },

    login: function (action, el, ev) {
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
          return;
        }

        // Use the first one returned (we hope there was only one).
        var user = users.shift();
        var userAttrs = user.attr();

        // Log em' in!
        $.cookie('authUser', user._id);
        userAttrs.loggedIn = true;

        // Save the user's attributes
        self.attr('user').attr(userAttrs);

        // Go to app
        can.route.removeAttr('returnUrl');
        can.route.attr({
          controller: 'log',
          action: 'index'
        });

      }, function (err) {

        // Generic error message
        state.alert('danger', 'Darn',
          'We couldn\'t log you in. Try again.');

        throw err;
      });
    },

    signup: function (action, el, ev) {
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

        // Make note of this moment in time.
        self.attr('user').attr({
          username: username,
          createdAt: new Date().toISOString()
        });

        self.attr('user').save()
          .done(function (response) {

            // Make the model a real.
            self.attr('user').attr('_id', response._id);
            self.attr('user').attr('loggedIn', true);

            // Log em' in
            $.cookie('authUser', response._id);

            // Send the user off to do some work.
            can.route.attr({
              controller: 'log',
              action: 'index'
            });

          })
          .fail(function (err) {

            // Generic error message
            state.alert('danger', 'Shoot',
              'The server didn\'t save your username. Try again.');

            throw err;

          });

      }, function (err) {
        console.log(arguments);
        throw err;
      });
    }
  });

  return can.Component.extend({
    tag: 'auth-controller',
    template: template,
    scope: ViewModel,
    events: {
      inserted: function () {
        if (this.scope.attr('action') === 'logout') {
          this.logout();
        }
      },
      logout: function () {
        $.removeCookie('authUser');
        state.attr('user').attr({}, true);
        state.attr('action', 'login')
      },
      '{scope} action': function () {
        if (this.scope.attr('action') === 'logout') {
          this.logout();
        }
      }
    },
    helpers: {
      isLoginContext: function (options) {
        if (this.attr('action') === 'login') {
          return options.fn();
        } else {
          return options.inverse();
        }
      },
      isSignupContext: function (options) {
        if (this.attr('action') === 'signup') {
          return options.fn();
        } else {
          return options.inverse();
        }
      }
    }
  });
});