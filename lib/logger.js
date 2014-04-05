import { extend, K } from "./utils";

var possibleLevels = ['info', 'debug', 'warn', 'error'];

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
    var possible = possibleLevels;
    var i, level, l;
    var levelObj = {};

    for (i = 0, l = levels.length; i < l; i++) {
      levelObj[levels[i]] = true;
    }

    for (i = 0, l = possible.length; i < l; i++) {
      level = possible[i];
      if (levelObj[level]) {
        this[level] = buildLogMethod(level);
      } else {
        this[level] = K;
      }
    }
    this._levels = levels;
  }
};

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
