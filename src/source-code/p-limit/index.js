import Queue from "yocto-queue";
import { AsyncResource } from "#async_hooks";

export default function pLimit(concurrency) {

  // 参数判断
  if (
    !(
      (Number.isInteger(concurrency) ||
        concurrency === Number.POSITIVE_INFINITY) &&
      concurrency > 0
    )
  ) {
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  }

  // 初始化队列
  const queue = new Queue();
  let activeCount = 0;

  const next = () => {

    // 当前执行数量减一
    activeCount--;

    // 如果队列里有的话继续取出执行
    if (queue.size > 0) {
      queue.dequeue()();
    }
  };

  const run = async (function_, resolve, arguments_) => {

    // 当前执行数量加一
    activeCount++;

    // 定义一个函数来异步执行用户传入的方法，并返回一个promise
    const result = (async () => function_(...arguments_))();

    // 回传result
    // 如果用户在外面定义了then方法或者Promise.all方法，都可以接收到result
    resolve(result);

    // 等待 result Promise 完成
    // try...catch 是用于捕获异常
    // 这样的话即使出现异常程序也能继续执行下去
    try {
      await result;
    } catch {}

    next();
  };

  const enqueue = (function_, resolve, arguments_) => {

    // 把run函数加入队列
    // 并传入用户定义方法和参数
    queue.enqueue(
      AsyncResource.bind(run.bind(undefined, function_, resolve, arguments_))
    );

    // 异步
    (async () => {
      // This function needs to wait until the next microtask before comparing
      // `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
      // when the run function is dequeued and called. The comparison in the if-statement
      // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
      await Promise.resolve();

      // 判断当前执行的函数数量是否小于并发数
      // 是的话出列执行
      if (activeCount < concurrency && queue.size > 0) {
        queue.dequeue()();
      }
    })();
  };

  // 暴露给用户的函数，返回一个Promise
  // 传入了resolve用于执行用户传递的函数之后回传给用户函数结果
  const generator = (function_, ...arguments_) =>
    new Promise((resolve) => {
      enqueue(function_, resolve, arguments_);
    });

  Object.defineProperties(generator, {
    // 正在运行的数量
    activeCount: {
      get: () => activeCount,
    },
    // 正在等待的数量
    pendingCount: {
      get: () => queue.size,
    },
    // 清除队列
    clearQueue: {
      value() {
        queue.clear();
      },
    },
  });

  return generator;
}
