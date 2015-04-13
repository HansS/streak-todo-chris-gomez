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

      // Don't submit the form
      ev.preventDefault();

      // Get the event title
      var title = this.attr('title');

      // Title required
      if (! title) {
        return;
      }

      // Create a event model
      var actionModel = new ActionModel({
        userId: state.attr('user').attr('_id'),
        title: title,
        relativeDate: state.attr('date').toISOString(),
        createdAt: new Date().toISOString()
      });

      // Add the event to the beginning of the event list
      // RE: Sort plugin - .push() should put the item in the correct spot
      this.attr('actions').push(actionModel);

      // Persist the model to the server
      actionModel.save();

      // Empty the input
      this.attr('title', '');
    },

    searchActions: function (context, el, ev) {

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