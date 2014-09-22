steal(
  'can',
  './user.js',
  'can/map/define',
function (can, UserModel) {

  return can.Map.extend({
    define: {
      user: {
        value: new UserModel()
      }
    }
  });
});