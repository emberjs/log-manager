import LogManager from 'log_manager';

var logManager;
function setup() {
  logManager = new LogManager();
}

module('LogManager', {
  setup: function() {
    setup();
  }
});

test("The same logger is reused for the same name", function() {
  var logger1 = logManager.loggerFor('router.transition');
  var logger2 = logManager.loggerFor('router.transition');
  strictEqual(logger1, logger2, 'The same class is reused for the same name');
});

test("A new logger is created for different names", function() {
  var logger1 = logManager.loggerFor('router.transition1');
  var logger2 = logManager.loggerFor('router.transition2');
  ok(logger1 !== logger2, 'A new logger is created for each name');
});
