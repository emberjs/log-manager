import { extend, K } from "./utils";
import logLevels from "./log_levels";

function Logger(opts) {
  this._name = opts.name;
  var levels = opts.levels || [];
  this.buildLogMethods(levels);
  this._appenders = opts.appenders || [];
};

var proto = {
  _name: undefined,
  _levels: undefined,
  _appenders: undefined,


  log: function(opts) {
    var appenders = this._appenders;
    for (var i = 0, l = appenders.length; i < l; i++) {
      appenders[i].log(this._name, opts.level, opts.message);
    }
  },

  setAppenders: function(appenders) {
    this._appenders = appenders;
  },

  buildLogMethods: function(levels) {
    var possible = logLevels;
    var i, level, l;
    var levelObj = {};

    for (i = 0, l = levels.length; i < l; i++) {
      levelObj[levels[i]] = true;
    }

    for (i = 0, l = possible.length; i < l; i++) {
      level = possible[i];
      // Set method to noop if it shouldn't log,
      // making calls to this logger free of charge :)
      if (!levelObj[level]) {
        this[level] = K;
      }
    }
    this._levels = levels;
  }
};

// Build level methods on prototype
for(var i = 0, l = logLevels.length; i < l; i++) {
  var level = logLevels[i];
  proto[level] = buildLogMethod(level);
}

extend(Logger.prototype, proto);

function buildLogMethod(level){
  return function(message) {
    if (typeof messafe === 'function') {
      message = message.call();
    }
    this.log({
      message: message,
      level: level
    });
  }
}

export default Logger;
