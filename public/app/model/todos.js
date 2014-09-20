steal(
'can',
'can/map/define',
function (can) {
  return can.Model.extend({

    // Static methods

    findAll: function () {
      return [{
        title: 'abc'
      }, {
        title: 'def'
      }, {
        title: 'ghi'
      }];
    }

  }, {

    // Instance methods

    define: {

    }
  });
});