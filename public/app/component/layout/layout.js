steal(
  'can',
function (can) {

  console.log('Included!')

  return can.Component.extend({
    tag: 'app-layout',
    events: {
      init: function () {
        console.log('Init!')
      },
      inserted: function () {
        console.log('Inserted!')
      }
    }
  });
});