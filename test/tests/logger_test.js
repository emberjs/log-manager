import Logger from "logger";

var logger, message, level;

function setup(opts) {
  logger = new Logger(opts);

  logger.log = function(opts) {
    message = opts.message;
    level = opts.level;
  };
}

module("Logger", {
  setup: function() {
  },
  teardown: function() {
    message = null;
    level = null;
    logger.destroy();
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

test("#warn with level warn", function() {
  setup({
    name: 'routes',
    levels: ['warn']
  });
  logger.warn("Hello");
  equal(message, "Hello");
  equal(level, 'warn');
});

test("#error with level error", function() {
  setup({
    name: 'routes',
    levels: ['error']
  });
  logger.error("Hello");
  equal(message, "Hello");
  equal(level, 'error');
});

test("#info with logging disabled", function() {
  setup({
    name: 'routes',
    levels: []
  });
  logger.info("Hello");
  equal(message, null);
  equal(level, null);
});
