/**
 * 给某一个对象提供一个代理对象，并由代理对象控制对原对象的引用
 * 优点：用户不会接触到原对象，并且可以在执行中可以进行其它操作（经典的比如像vue的数据劫持）
 * 使用：Proxy + Reflect对象，Reflect也用来解决代理过长中的this指向问题
 * https://es6.ruanyifeng.com/#docs/proxy
 * DOM的事件代理
 */

const obj = {
  name: "张三",
  age: 24,
};

const proxy = new Proxy(obj, {
  get: function (target, name, recriver) {
    console.log(target, name, recriver);
    return Reflect.get(target, name, recriver);
  },
  set: function (target, name, val, recriver) {
    console.log(target, name, val, recriver);
    return Reflect.set(target, name, val, recriver);
  },
  has: function (target, name) {
    console.log(target, name);
    return Reflect.has(target, name);
  },
  // 等等...
});
