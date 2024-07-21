/**
 * 使用场合
 * 1.该模式适用于期待接口与现在接口不兼容。
 * 2.适配器所适配的两个方法执行需是类似的任务。
 * 3.接口最好是成形的。如果新接口或者现有的老接口没有成型，那么适配器不会一直管用，就失去了它的意义。
 */


var clientObj = {
	name: 'Jack',
	phone: '13333333333',
	address: 'China'
}

function interfaceMethod(str1, str2, str3) {
	// ...
}

// 传参方式不一样，所以加上个适配器函数
function clientToInterfaceAdapter(o) {
	interfaceMethod(o.name, o.phone, o.address)
}

// 利用适配器传递对象
clientToInterfaceAdapter(clientObj)
