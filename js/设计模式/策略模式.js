/**
 * 将算法封装到一个通用对象中，在调用时使其可以相互替换
 * 优点：解决if...else...带来的代码臃肿问题
 */

const wayMap = {
  way1: function () {
    console.log("我是方法1");
  },
  way2: function () {
    console.log("我是方法2");
  },
  way3: function () {
    console.log("我是方法3");
  },
};

function getFunction(type) {
  // 这样子就摆脱了常规if...else...的写法
  wayMap[type]();
}

getFunction("way1");
