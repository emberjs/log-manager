# Log Manager

Logging library with a focus on hierarchy, performance, and multiple appenders.  Borrows most of the concepts from java's [log4j](http://logging.apache.org/log4j/2.x/).


### Appenders

An appender translates a log into a console entry, file entry, ajax post... etc.  You can have multiple appenders, and appenders can be assigned to specific loggers.

The appenders follow the hierarchical model (an appender to a parent will apply to its children).

#### Adding an appender

When adding an appender, specify the name, and the appender instance.

```javascript

var logManager = new LogManager();

logManager.addAppenderTo('router', new ConsoleAppender());
logManager.addAppenderTo('router.transitions', new AjaxAppender()).


logManager.loggerFor('router'); // will use the console appender
logManager.loggerFor('router.transitions'); // will use the console appender and the ajax appender

```

#### Built-in Appenders

##### Console Appender

Logs to the console.  Uses different methods based on the level.

`log.error` uses `console.error`
`log.warn` uses `console.warn`
`log.debug` uses `console.debug`
`log.info` use `console.info`

More built-in appenders should come soon.


### Logging format

```javasript
var logManager = new LogManager();

logManager.addDefaultAppender(new ConsoleAppender());
var logger = logManager.loggerFor('router');

logger.info('Hello Teddy'); // console.info('Hello Teddy');
var person = { toString: 'Teddy' };
logger.info('Hello @%', [person]); // console.info('Hello Teddy');
logger.info(function() {
  return 'Hello Teddy';
}); // console.info('Hello Teddy');
```

### Logging levels

Possible levels: info, debug, warn, error;

You can set default levels and levels per logger.

Set the levels to an array (ex: `['info', 'warn']`).

To set the default levels use:

```javascript
var logManager = new LogManager();
logManager.defaultLevels(['warn', 'error']);
logManager.addDefaultAppender(new ConsoleAppender());

//... somewhere in your code

var logger = logManager.loggerFor('ember-data');

logger.info('Finding record with id = 1'); // noop

logger.warn('Record does not have an id'); // console.warn('Record does not have an id')

logger = logManager.loggerFor('ember-data.adapters');

logger.error('Record not found'); // console.error('Record not found');

logManager.levelsFor('ember-data.adapters', []);

logger.error('Record not found'); // noop


```

### Performance

A lot of focus for this logger is performance, especially when logging levels are disabled.  The idea is mainly that if logging is disabled, it should be as expensive as stripping the log methods during build time.

Since the logger is requested before hand, logging levels are pre-computed, and all level methods that should not be logging will be set to empty functions.
This makes logging almost free in cases where you don't need it.

For example:

```javascript
var logger = logManager.loggerFor('prison');

// If warn level is disabled for 'prison' logging, the log manager will set `logger.warn = function(){}`

// This method is almost free
logger.warn('This person is dangerous');

// This method even avoids calling `toString` on `person`
logger.warn('Person named %@ is dangerous', person);

// This method is almost free as the function is never called
logger.warn(function() {
  return people.filterBy('isDangerous', true).map(function(name) {
    return name + " is dangerous \n";
  });
});
```

So the only thing you need to worry about when in production and logging is disabled is the extra bytes added by logging methods, and not the lookup costs.


### Developing and testing

The project uses [Broccoli](https://github.com/joliss/broccoli) as a build tool, but wraps all commands with grunt.

Installation:

```bash
npm install -g grunt-cli

npm install
```

The commands are:

- `grunt build` to build the dist files
- `grunt server` to run the test server at `http://localhost:4200`
