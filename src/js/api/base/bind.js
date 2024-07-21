function.prototype.bind = function(thisArg) {
  if (typeof this !== 'function') {
    throw new Error('is not a function')
  }
  var _self = this;
  // arguments是类数组对象
  // 可以用ES6的Array.from()转化
  var context = [].shift.call(arguments);
  var params = [].slice.call(arguments)
  return function() {
    return _self.apply(context, params)
  }
}