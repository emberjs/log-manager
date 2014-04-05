import { extend } from "../utils";

function ConsoleAppender() {}

var proto = {
  log: function(name, level, message) {
    console[level].call(console, message);
  }
};

extend(ConsoleAppender.prototype, proto);

export default ConsoleAppender;
