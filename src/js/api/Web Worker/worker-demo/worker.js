// 引入其它脚本
importScripts('./utils.js');
console.log(add(1, 2)); // log 3

// 监听从主线程发送的信息
self.addEventListener("message", (e) => {
  // 接收到消息
  console.log(e.data); // Greeting from Main.js，主线程发送的消息
  self.postMessage("send message too"); // 向主线程发送消息

  // throw Error('Error from Worker.js'); // 抛出异常会被主线程的error事件监听到
});

// 关闭worker
self.close(); // 关闭worker

// 在worker内部关闭的话下面事件还是会发送，主线程也会接收到（包括微任务）
self.postMessage("send message too"); // 向主线程发送消息
Promise.resolve().then(() => {
  postMessage("send message promise");
});
