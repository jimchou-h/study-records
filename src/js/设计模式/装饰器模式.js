// 定义打开按钮
class OpenButton {
	onClick() {
		console.log('我是点击方法')
	}
}

// 定义按钮对应的装饰器
class Decorator {
	// 将按钮实例传入
	constructor(open_button) {
		this.open_button = open_button
	}

	onClick() {
		this.open_button.onClick()
		console.log('我包装了点击方法')
	}
}

const openButton = new OpenButton()
const decorator = new Decorator(openButton)


/**
 * ES7 装饰器（需配合babel使用）
 */
// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
	target.hasDecorator = true
	return target
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {
	// Button类的相关逻辑
}

console.log(Button.hasDecorator) // true

//----------------------------------------------------------

// 装饰方法的函数
// target -> 在这里指Button类的原型
// name -> 被修饰的方法名，这里指'onClick'
// descriptor -> 这里是指onClick的属性描述符
function funcDecorator(target, name, descriptor) {
	const original = descriptor.value
	// 在原有方法的基础上再进行一层封装
	descriptor.value = function(...args: any[]) {
		original.call(this, ...args)
		console.log('我修饰了onClick方法')
	}
	// 需要返回属性描述符
	return descriptor
}

class Button {
	@funcDecorator
	onClick() {
		console.log('我是Func的原有逻辑')
	}
}

let button = new Button()
console.log(button.onClick())
