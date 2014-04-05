import Logger from "logger";
import ConsoleAppender from "appenders/console";

var logger, message, level, name;

function setup(opts) {
  opts.appenders = [ {
    log: function(n, l, m) {
      message = m;
      level = l;
      name = n;
    }
  } ];
  logger = new Logger(opts);
}

module("Logger", {
  teardown: function() {
    message = null;
    level = null;
    name = null;
  }
});

test("#info with level info", function() {
  setup({
    name: 'routes',
    levels: ['info']
  });
  logger.info("Hello");
  equal(message, "Hello");
  equal(level, 'info');
});

test("#debug with level debug", function() {
  setup({
    name: 'routes',
    levels: ['debug']
  });
  logger.debug("Hello");
  equal(name, "routes");
  equal(message, "Hello");
  equal(level, 'debug');
});

test("#warn with level warn", function() {
  setup({
    name: 'routes',
    levels: ['warn']
  });
  logger.warn("Hello");
  equal(name, "routes");
  equal(message, "Hello");
  equal(level, 'warn');
});

test("#error with level error", function() {
  setup({
    name: 'routes',
    levels: ['error']
  });
  logger.error("Hello");

  equal(name, "routes");
  equal(message, "Hello");
  equal(level, 'error');
});

test("#info with logging disabled", function() {
  setup({
    name: 'routes',
    levels: []
  });
  logger.info("Hello");
  equal(name, null);
  equal(message, null);
  equal(level, null);
});

test("string message format", function() {
  setup({name: 'routes', levels: ['info']});
  logger.info("Hi");
  equal(message, "Hi");
});

test("lazy toString message format", function() {
  setup({name: 'routes', levels: ['info']});
  var person1 = {
    toString: function() {
      return 'Teddy';
    }
  };
  var person2 = {
    toString: function() {
      return 'Joey';
    }
  }
  logger.info("Hi @% and @%", [person1, person2]);
  equal(message, "Hi Teddy and Joey");
});

test("lazy function message format", function() {
  setup({name: 'routes', levels: ['info']});

  logger.info(function() {
    return "Hi Teddy and Joey";
  });
  equal(message, "Hi Teddy and Joey");
});
