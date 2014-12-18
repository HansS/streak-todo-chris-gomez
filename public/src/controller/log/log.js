steal(
  'can',
  'lodash',
  './log.stache!',
  'src/model/state.js',
  'src/model/action.js',
  './log.less!',

  'src/component/date-nav',
  'src/component/form',
  'src/component/actions',
  'can/map/define',
  'can/list/promise',
function (can, _, template, state, ActionModel) {

  var ViewModel = can.Map.extend({
    define: {
      actions: {
        Type: ActionModel.List
      }
    }
  });

  return can.Component.extend({
    tag: 'log-controller',
    template: template,
    scope: ViewModel,
    events: {

      inserted: function () {
        var self = this;
        var userId = state.attr('user').attr('_id');

        // This should never happen.
        if (! userId) {
          throw "Cannot get a action list without a user id.";
        }

        // Get all the actions for this user
        // TODO: Move this to the state model
        var allActions = ActionModel.findAll({
          query: {
            match: {
              userId: userId
            }
          },
          sort: {
            createdAt: {
              order: 'desc'
            }
          }
        }).then(function (actions) {

          // Transfer the date over to the actions
          actions.each(function (action) {
            action.attr('relativeDate', self.scope.attr('date'));
          });

          return actions;
        });

        // Handle a failed findAll
        allActions.fail(function () {
          state.alert('danger', 'Blast',
            'There was an error getting your actions. Cross your fingers ' +
            'and try again.');
        });

        state.attr('actions').replace(allActions);
      }
    }
  });
});