import Logger from "./logger";
import { extend, combinations, isParentOf } from "./utils";
import logLevels from "./log_levels";

function LogManager() {
  this.loggers = {};
  this.appenders = {
    '*': []
  };
  this.levels = {
    '*': logLevels.slice()
  };
}

var proto = {
  loggerFor: function(name) {
    var logger = this.loggers[name];
    if (logger) {
      return logger;
    } else {
      var levels = this.levelsFor(name);
      var appenders = this.appendersFor(name);
      logger = new Logger({ name: name, levels: levels, appenders: appenders});
      this.loggers[name] = logger;
      return logger;
    }
  },

  addAppenderTo: function(name, appender) {
    var appenders = this.appenders[name] = this.appenders[name] || [];
    appenders.push(appender);
    // update already instantiated loggers
    for (var loggerName in this.loggers) {
      if (!this.loggers.hasOwnProperty(loggerName)) {
        continue;
      }
      if (isParentOf(name, loggerName) || name === loggerName) {
        this.loggerFor(loggerName).setAppenders(this.appendersFor(loggerName));
      }
    }
  },

  addDefaultAppender: function(appender) {
    this.addAppenderTo('*');
  },

  appendersFor: function(name) {
    var names = combinations(name), appenders = [];
    for (var i = 0, l = names.length; i < l; i++) {
      var currentAppenders = this.appenders[names[i]] || [];
      appenders = appenders.concat(currentAppenders);
    }
    appenders.concat(this.defaultAppenders());
    return appenders;
  },

  levelsFor: function(name, levels) {
    if (levels) {
      this.levels[name] = levels;
    } else {
      var names = combinations(name);
      levels = [];
      for (var i = 0, l = names.l; i < l; i++) {
        if (this.levels[name]) {
          return this.levels[name];
        }
      }
      return this.defaultLevels();
    }
  },

  defaultLogger: function() {
    return this.loggerFor('*');
  },

  defaultAppenders: function() {
    return this.appenders['*'];
  },

  defaultLevels: function(levels) {
    if (levels) {
      this.levels['*'] = levels.slice();
    } else {
      return this.levels['*'];
    }
  }
};


extend(LogManager.prototype, proto);


export default LogManager;
