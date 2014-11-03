steal(
  'can',
function (can) {
  // var m = new can.Map({
  //   '123': 1,
  //   '345': 1
  // });
  var m = new can.List([1, 2, 3]);

  var peekaboo = 'I see you!';

  m.each(function () {
    debugger;
    console.log(peekaboo);
  });
});