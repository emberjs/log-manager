export default function(Klass, mixin) {
  for (var i in mixin) {
    if (!mixin.hasOwnProperty(i)) {
      continue;
    }
    Klass.prototype[i] = mixin[i];
  }
};
