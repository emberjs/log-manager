export function extend(obj1, obj2) {
  for (var i in obj2) {
    if (!obj2.hasOwnProperty(i)) {
      continue;
    }
    obj1[i] = obj2[i];
  }
  return obj1;
}

export function K() {}

export function combinations(name) {
  var names = name.split('.');
  if (names.length === 1) {
    return [name];
  } else {
    names.pop();
    return [name].concat(combinations(names.join('.')));
  }
}


export function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
