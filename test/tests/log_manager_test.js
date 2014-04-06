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

test("#addAppenderTo and #appenderFor", function() {
  var appender1 = 1, appender2 = 2;
  logManager.addAppenderTo('routes.transitions', appender1);
  logManager.addAppenderTo('routes', appender2);
  deepEqual(logManager.appendersFor('routes.transitions'), [appender1, appender2], "router.transition should have 2 appenders");
  deepEqual(logManager.appendersFor('routes'), [appender2]);
});


test("#addAppenderTo a logger parent", function() {
  // instantiate logger
  expect(2);

  var appender = {
    log: function(name, level, message) {
      equal(message, 'yes');
    }
  };

    logManager.addAppenderTo('router.routes', appender);
    var logger1 = logManager.loggerFor('router');
    var logger2 = logManager.loggerFor('router.routes');
    var logger3 = logManager.loggerFor('router.routes.transitions');

    logger1.info('no');
    logger2.info('yes');
    logger3.info('yes');
});


test("#addAppenderTo to an already instantiated logger updates the logger's appenders", function() {
  expect(2);
  var appender = {
    log: function(name, level, message) {
      equal(message, 'yes');
    }
  };

  // instantiate loggers
  var logger1 = logManager.loggerFor('router');
  var logger2 = logManager.loggerFor('router.routes');
  var logger3 = logManager.loggerFor('router.routes.transitions');
  logManager.addAppenderTo('router.routes', appender);

  logger1.info('no');
  logger2.info('yes');
  logger3.info('yes');
});

test("#levelsFor is inherited by children", function() {
  expect(4);
  var appender = {
    log: function(name, level, message) {
      equal(message, 'yes');
      equal(level, 'info');
    }
  };
  logManager.addDefaultAppender(appender);
  //reset levels
  logManager.defaultLevels([]);


  // configure the level
  logManager.levelsFor('router.routes', ['info']);

  // instantiate loggers
  var logger1 = logManager.loggerFor('router');
  var logger2 = logManager.loggerFor('router.routes');
  var logger3 = logManager.loggerFor('router.routes.transitions');


  logger1.info('no');
  logger1.error('no');
  logger2.info('yes');
  logger2.error('no');
  logger3.info('yes');
  logger3.error('no');

});


test("#levelsFor to an already instantiated logger updates the logger's levels", function() {
  expect(4);
  var appender = {
    log: function(name, level, message) {
      equal(message, 'yes');
      equal(level, 'info');
    }
  };
  logManager.addDefaultAppender(appender);
  //reset levels
  logManager.defaultLevels([]);

  // instantiate loggers
  var logger1 = logManager.loggerFor('router');
  var logger2 = logManager.loggerFor('router.routes');
  var logger3 = logManager.loggerFor('router.routes.transitions');


  // configure the level
  logManager.levelsFor('router.routes', ['info']);


  logger1.info('no');
  logger1.error('no');
  logger2.info('yes');
  logger2.error('no');
  logger3.info('yes');
  logger3.error('no');


});
