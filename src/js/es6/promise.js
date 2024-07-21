// 定义：是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作的结果）
// 特点：
//   1.对象的状态不受外界影响，只有异步操作的结果才会影响
//   2.一旦状态改变，就不会再变，任何时候都可以得到这个结果
//   3.then方法是定义在原型上的，所以可以return一个Promise再.then（链式调用）去调用它（解决回调地狱问题）
// 缺点：
//   1.无法中途取消
//   2.处于pending状态时无法得知进度
//   3.内部抛出的错误，不会反应到外部，需要设置回调函数，如try...catch...?
// 注意点：
//   1.如果一个Promise去resolve了另一个pending中的Promise，它的状态将由另一个Promise的异步操作结果决定
//   2.Promise的错误是冒泡性质，未被捕获会一直到最后的catch方法上，没有catch则不会被捕获，也不会传递到外部

// 静态方法：
//   1.Promise.all（iterable） 返回一个新的Promise对象，在传入的iterable参数对象里的所有Promise对象都成功的时候才会成功（会按顺序返回结果），否则就会失败（返回失败的那一个信息）
//   2.Promise.race（iterable） 所有Promise中哪个返回结果最快就返回哪个的值
//   3.Promise.allSettled（iterable） 所有Promise都执行完毕（不管成功或失败）后返回一个新的Promise（会按顺序返回结果）
//   4.Promise.any（iterable）当有一个Promise返回成功时返回该Promise的值
//   5.Promise.resolve（val）返回一个成功的Promise
//   6.Promise.reject（reason）返回一个失败的Promise

// 手写Promise实现
class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  // Promise.resolve
  static resolve(result) {
    return new MyPromise((resolve, reject) => {
      if (result instanceof MyPromise) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    });
  }
  // Promise.reject
  static reject(result) {
    return new MyPromise((_, reject) => {
      reject(result);
    });
  }
  X;
  // Promise.race
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      // 哪个最快就resolve哪个
      promises.map((promise) => {
        promise.then(resolve, reject);
      });
    });
  }
  constructor(exec) {
    this.status = MyPromise.PENDING;
    this.value = null;
    // 当exec函数里改变状态的逻辑也是异步的话，状态还是pending，这个时候需要存起来等后面使用
    this.callbacks = [];
    try {
      exec(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(value) {
    // 调用后改变状态并保存值
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;
      // 有回调的话执行回调函数
      setTimeout((_) => {
        this.callbacks.map((callback) => {
          callback.onFulfilled(value);
        });
      });
    }
  }
  reject(value) {
    // 调用后改变状态并保存值
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.value = value;
      setTimeout((_) => {
        this.callbacks.map((callback) => {
          callback.onRejected(value);
        });
      });
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      onFulfilled = (value) => value;
    }
    if (typeof onRejected !== "function") {
      onRejected = (value) => value;
    }
    // return 实现Promise的链式调用
    let promise = new MyPromise((resolve, reject) => {
      // 当exec函数里改变状态的逻辑也是异步的情况下，状态值没有改变
      if (this.status === MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            this.parse(promise, onFulfilled(value), resolve, reject);
          },
          onRejected: (value) => {
            this.parse(promise, onRejected(value), resolve, reject);
          },
        });
      }
      if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          this.parse(promise, onFulfilled(this.value), resolve, reject);
        });
      }
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject);
        });
      }
    });
    return promise;
  }
  // 复用方法，then方法里抽出复用
  parse(promise, result, resolve, reject) {
    // then方法的返回的promise不能是和then相同的Promise
    if (promise === result) {
      throw new TypeError("Chaining cycle detected for promise");
    }
    try {
      if (result instanceof MyPromise) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }
}
