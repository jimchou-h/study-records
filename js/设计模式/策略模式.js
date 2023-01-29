// PS: 本质就是把if...else...的逻辑封装起来，改成用对象映射

const wayMap = {
	way1: function() {
		console.log('我是方法1')
	},
	way2: function() {
		console.log('我是方法2')
	},
	way3: function() {
		console.log('我是方法3')
	}
}

function getFunction(type) {
	// 这样子就摆脱了常规if...else...的写法
	wayMap[type]()
}

getFunction('way1')
