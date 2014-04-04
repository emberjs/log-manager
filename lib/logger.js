import mixin from "./utils/mixin";
import K from "./utils/k";


var Logger = function(opts) {
  this.name = opts.name;
  var levels = opts.levels || [];
  this.buildLogMethods(levels);
};

var proto = {
  log: function(opts) {
    console.log(opts.level.toUpperCase(), opts.message);
  },

  buildLogMethods: function(levels) {
    var possible = ['info', 'warn', 'error'];
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
  },

  addApender: function(name, method) {
    if (!method) {
      name = undefined;
      method = name;
    }
  },

  destroy: K
};

mixin(Logger, proto);

function buildLogMethod(level){
  return function(message) {
    this.log({
      message: message,
      level: level
    });
  }
}

export default Logger;
