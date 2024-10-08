// https://leetcode.cn/problems/implement-queue-using-stacks/description/


var MyQueue = function() {
  this.inStack = []
  this.outStack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.inStack.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  if (!this.outStack.length) {
    this.inToOut()
  }
  return this.outStack.pop()
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  if (!this.outStack.length) {
    this.inToOut()
  }
  return this.outStack[this.outStack.length - 1]
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return !(this.inStack.length || this.outStack.length)
};

/**
 * @return {boolean}
 */
MyQueue.prototype.inToOut = function() {
  while (this.inStack.length) {
    this.outStack.push(this.inStack.pop())
  }
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */