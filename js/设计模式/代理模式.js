// PS: es6有个非常好用的特性proxy, Reflect对象则是支持对应的方法修改
// https://es6.ruanyifeng.com/#docs/proxy
// DOM的事件代理

const obj = {
	name: '张三',
	age: 24
}

const proxy = new Proxy(obj, {
	get: function(target, name, recriver) {
		console.log(target, name, recriver)
		return Reflect.get(target, name, recriver)
	},
	set: function(target, name, val, recriver) {
		console.log(target, name, val, recriver)
		return Reflect.set(target, name, val, recriver)
	},
	has: function(target, name) {
		console.log(target, name)
		return Reflect.has(target, name)
	},
	// 等等...
})
