// 防抖：直到过程结束后才会去执行
function debounce(fn, delay) {
  var timer; // 维护一个 timer
  return function() {
    var _this = this; // 取debounce执行作用域的this
    var args = [].slice.call(arguments);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      fn.apply(_this, args); // 用apply指向调用debounce的对象
    }, delay);
  };
}
