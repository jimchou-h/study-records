/**
 * 保证一个类（js中指构造函数）仅有一个实例，并提供一个访问它的全局访问点
 * 缺点: Name函数不是私有函数，可以被直接访问，JS目前无法解决
 */

function Name(name) {
  this.name = name;
}

function Single() {
  // 闭包保存实例
  var instance = null;
  return function (name) {
    if (!instance) {
      instance = new Name(name);
    }
    return instance;
  };
}

var single = Single();

// 返回的同一个实例
let s1 = single("张三");
let s2 = single("李四");
