steal(function () {
  return function (momentInstance) {
    return momentInstance
      .milliseconds(0)
      .seconds(0)
      .minutes(0)
      .hours(0);
  }
})