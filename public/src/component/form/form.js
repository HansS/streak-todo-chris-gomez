steal(
  'can',
  './form.stache!',
  'src/model/state.js',
  'src/model/action.js',
  './form.less!',
  'can/map/define',
function (can, template, state, ActionModel) {

  var ViewModel = can.Map.extend({
    define: {
      actions: {
        Type: ActionModel.List,
        Value: ActionModel.List
      },
      title: {
        type: 'string',
        value: ''
      }
    },

    createAction: function (context, el, ev) {

      // Only proceed if enter key pressed
      if (ev.which !== 13) {
        return;
      }

      // Stop from rendering the newline
      ev.preventDefault();

      // Get the action title
      var title = el.val();

      // Title required
      if (! title) {
        return;
      }

      // Create a action model
      var actionModel = new ActionModel({
        userId: state.attr('user').attr('_id'),
        title: title,
        relativeDate: state.attr('date').toISOString(),
        createdAt: new Date().toISOString()
      });

      // Add the action to the beginning of the action list
      // RE: Sort plugin - .push() should put the item in the correct spot
      this.attr('actions').push(actionModel);

      // Persist the model to the server
      actionModel.save();

      // Empty the textarea
      el.val('');
    },

    searchActions: function (context, el, ev) {

      ev.preventDefault();

      var title = this.attr('title');

      if (title.length < 2) {
        return;
      }

      var searchDfd = ActionModel.findAll({
        query: {
          fuzzy_like_this_field: {
            title: {
              like_text: title
            }
          }
        }
      });

      state.attr('actions').replace(searchDfd);
    },

    clearInput: function () {
      this.attr('title', '');
    }
  });

  return can.Component.extend({
    tag: 'app-form',
    template: template,
    scope: ViewModel,
    events: {
    }
  });
});