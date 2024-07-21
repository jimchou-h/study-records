// 在 JavaScript 中，每个对象都有一个原型对象，而原型对象又有自己的原型对象，形成了一个链式结构，即原型链
// 当你访问一个对象的属性或方法时，如果该对象本身没有这个属性或方法，JavaScript 引擎就会沿着原型链往上查找，直到找到匹配的属性或方法或者到达原型链的末端（即 Object.prototype）
// 如果没有找到，则返回 undefined。

class A {}
A.prototype.b = 1
let c = new A()
c.b // 输出1
c.__proto__ === A.prototype // 输出true