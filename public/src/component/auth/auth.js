steal(
  'can',
  './auth.stache!',
  'src/model/user.js',

  './auth.less!',
  'can/map/define',
function (can, template, UserModel) {

  var ViewModel = can.Map.extend({
    define: {
      context: {
        type: 'string',
        value: 'signup'
      }
    },

    submit: function (context, el, ev) {
      ev.preventDefault();

      if (this.attr('context') === 'login') {
        this.login.apply(this, arguments);
      } else {
        this.signup.apply(this, arguments);
      }
    },

    login: function (context, el, ev) {
      var username = this.attr('username');

      if (! username) {
        window.state.attr('alerts').push({
          type: 'info',
          heading: 'Duh',
          message: 'You can\'t login without a username.'
        });

        return;
      }

      var def = UserModel.findOne({
        id: username
      });

      def.then(function (model) {
        console.log(model);
      });

      def.fail(function () {
        console.log(arguments);
      });
    },

    signup: function (context, el, ev) {
      var self = this;
      var username = this.attr('user').attr('username');

      console.log('Signing up..', username)

      if (! username) {
        window.state.attr('alerts').push({
          type: 'info',
          heading: 'Duh',
          message: 'You can\'t signup without a username.'
        });

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
          window.state.attr('alerts').push({
            type: 'warning',
            heading: 'Sorry',
            message: 'That username is taken.'
          });
          return;
        }

        self.attr('user').save()
          .done(function (response) {
            console.log('Successful create user response:', response)
          })
          .fail(function (err) {
            console.log('Failed create user response:', err);
          });

      }, function (err) {
        console.log(arguments)
        throw err;
      });
    },

    switchToLoginContext: function () {
      this.attr('context', 'login');
    },

    switchToSignupContext: function () {
      this.attr('context', 'signup');
    },
  });

  return can.Component.extend({
    tag: 'app-auth',
    template: template,
    scope: ViewModel,
    events: {
      inserted: function () {
        var self = this;

        setTimeout(function () {
          self.element.find('form').trigger('submit');
        }, 1000);
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