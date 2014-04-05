import { extend, K, isArray } from "./utils";
import logLevels from "./log_levels";

var slice = [].slice;

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


  log: function() {
    var args = slice.call(arguments);
    var level = args.shift();
    var message = handleMessage(args);
    var appenders = this._appenders;
    for (var i = 0, l = appenders.length; i < l; i++) {
      appenders[i].log(this._name, level, message, { raw: args, time: this.now() });
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
  },

  now: function() {
    return new Date();
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
    var args = slice.call(arguments);
    args.splice(0, 0, level);
    this.log.apply(this, args);
  }
}

function handleMessage(args) {
  var message = args[0];

  if (args.length === 1) {
    if (typeof message === 'function') {
      message = message();
    }
  }
  if(args.length > 1) {
    if (isArray(args[1])) {
      var objects = args[1];
      for(var i = 0, l = objects.length; i < l; i++) {
        message = message.replace('@%', objects[i].toString());
      }
    }
  }
  return message;
}

export default Logger;
