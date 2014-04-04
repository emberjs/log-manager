import Logger from "logger";

var LogManager = function() {
  this.loggers = {};
};

LogManager.prototype.loggerFor = function(name) {
  var logger = this.loggers[name];
  if (logger) {
    return logger;
  } else {
    logger = new Logger({ name: name });
    this.loggers[name] = logger;
    return logger;
  }
};


export default LogManager;
