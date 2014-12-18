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
      }
    },

    createAction: function (context, el, ev) {

      // Don't submit the form
      ev.preventDefault();

      // Get the event input
      var input = el.find('[name="title"]');

      // Get the event title
      var title = input.val();

      // Title required
      if (! title) {
        return;
      }

      // Create a event model
      var actionModel = new ActionModel({
        userId: state.attr('user').attr('_id'),
        title: title,
        relativeDate: state.attr('date'),
        createdAt: new Date().toISOString()
      });

      // Add the event to the beginning of the event list
      // TODO: Don't rely on unshift. Sort Todo.List by created date/time.
      // NOTE: I should be able to add a model to the list with any
      // createdAt time and have it inserted in the right place.
      this.attr('actions').unshift(actionModel);

      // Persist the model to the server
      actionModel.save();

      // Empty the input
      input.val('').trigger('change');


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