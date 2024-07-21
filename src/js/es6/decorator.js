/**
 * ES5
 */
var obj1 = {
  show() {
    console.log('我是原生方法')
  }
}
var objDecorator = {
  show() {
    obj1.show()
    console.log('我将原生方法装饰了')
  }
}
objDecorator.show()

/**
 * ES6
 */
class Origin {
  constructor() {}
  show() {
    console.log('我是原生方法')
  }
}
class Decorator {
  constructor(obj) {
    // 需要装饰的对象
    this.obj = obj
  }
  show() {
    this.obj.show()
    console.log('我将原生方法装饰了')
  }
}
let obj = new Decorator(new Origin())
obj.show()
