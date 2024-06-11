function deepCopy(obj, hash = new WeakMap()) {
	// 处理null或者undefined
	if (obj === null) return obj
	// 处理日期类型
	if (obj instanceof Date) return new Date(obj)
	// 处理正则类型
	if (obj instanceof RegExp) return new RegExp(obj)
	// 普通值或函数不需要深拷贝
	if (typeof obj !== 'object') return obj
	// 有缓存直接返回
	if (hash.get(obj)) return hash.get(obj)

	let cloneObj = new obj.constructor() // 继承 obj 对象的原型链上的属性和方法
	hash.set(obj, cloneObj)
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			cloneObj[key] = deepCopy(obj[key], hash)
		}
	}
	return cloneObj
}
