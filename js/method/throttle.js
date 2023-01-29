// 节流：在一段时间内多次触发只会执行一次
function throttle(fn, delay) {
  var timer;
  return function() {
    var _this = this;
    var args = arguments;
    if (timer) {
      return;
    }
    timer = setTimeout(function() {
      fn.apply(_this, args);
      timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
    }, delay)
  }
}

// 不使用setTimeout函数实现
function throttle(fn, delay) {
  var previous = 0;
  // 使用闭包返回一个函数并且用到闭包函数外面的变量previous
  return function() {
    var _this = this;
    var args = arguments;
    var now = new Date();
    if (now - previous > delay) {
      fn.apply(_this, args);
      previous = now;
    }
  }
}
