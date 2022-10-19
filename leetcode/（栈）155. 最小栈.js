/**
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈
 * push(x) —— 将元素 x 推入栈中
 * pop() —— 删除栈顶的元素
 * top() —— 获取栈顶元素
 * getMin() —— 检索栈中的最小元素
 */

var MinStack = function() {
  this.stack = [];
  this.min = Number.MAX_SAFE_INTEGER;
};

MinStack.prototype.push = function(x) {
  // 最小值替换时一次添加两个值
  // 在最新的最小值前存上一个最小值
  if (x <= this.min) {
    this.stack.unshift(x, this.min);
    this.min = x
  } else {
    this.stack.unshift(x);
  }
};

MinStack.prototype.pop = function() {
  let {
    stack,
    min
  } = this
  // 遇到最小值取出一次取两个值
  // 再出栈一次就能取到上一个最小值，这样就不用通过遍历去获取当前栈的最小值了
  if (stack.shift() === min) {
    this.min = stack.shift()
  }
};

MinStack.prototype.top = function() {
  return this.stack[0];
};

MinStack.prototype.getMin = function() {
  return this.min;
};
