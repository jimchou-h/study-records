/**
 * 应用场景
 *  1.vue nextTick
 *  2.防止去水印
 */

//next-tick.js
export function myNextTick(fn) {
  let app = document.getElementById("app");

  // 观察目标DOM及其子节点的变化
  var observerOptions = {
    childList: true, // 观察目标子节点的变化，是否有添加或者删除
    attributes: true, // 观察属性变动
    subtree: true, // 观察后代节点，默认为 false
  };

  // 创建 MutationObserver 实例
  let observer = new MutationObserver(() => {
    // 当DOM结构发生变化时，执行回调函数
    fn();
  });

  // 开始监听目标DOM
  observer.observe(app, observerOptions);
}
