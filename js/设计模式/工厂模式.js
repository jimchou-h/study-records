/**
 * 普通工厂
 */

function User(name, age, career, work) {
	this.name = name
	this.age = age
	this.career = career
	this.work = work
}

function Factory(name, age, career) {
	let work
	switch (career) {
		case 'coder':
			work = ['写代码', '写系分', '修Bug']
			break
		case 'product manager':
			work = ['订会议室', '写PRD', '催更']
			break
		case 'boss':
			work = ['喝茶', '看报', '见客户']
			break
		case 'xxx':
			// 其它工种的职责分配等...
			break
	}
	return new User(name, age, career, work)
}

/**
 * 抽象工厂
 * 围绕一个超级工厂创建其他工厂。该超级工厂又称为其他工厂的工厂
 * 插件库里应用广泛
 * 符合开放封闭原则
 * https://blog.csdn.net/qq_33732195/article/details/110101808?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-110101808-blog-116699453.pc_relevant_aa2&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-110101808-blog-116699453.pc_relevant_aa2&utm_relevant_index=1
 */

// 手机类（超级工厂）
class MobilePhoneFactory {
	// 提供操作系统的接口（使用了操作系统的工厂）
	createOS() {
		throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
	}
	// 提供硬件的接口（使用了硬件的工厂）
	createHardWare() {
		throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
	}
}

class FakeStarFactory extends MobilePhoneFactory {
	createOS() {
		// 提供安卓系统实例
		return new AndroidOS()
	}
	createHardWare() {
		// 提供高通硬件实例
		return new QualcommHardWare()
	}
}

// 操作系统工厂
class OS {
	controlHardWare() {
		throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
	}
}

class AndroidOS extends OS {
	controlHardWare() {
		console.log('我会用安卓的方式去操作硬件')
	}
}

class AppleOS extends OS {
	controlHardWare() {
		console.log('我会用apple的方式去操作硬件')
	}
}

// 硬件工厂
class HardWare {
	// 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
	operateByOrder() {
		throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
	}
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
	operateByOrder() {
		console.log('我会用高通的方式去运转')
	}
}

class MiWare extends HardWare {
	operateByOrder() {
		console.log('我会用小米的方式去运转')
	}
}

// 最后只需要这么调用

// 这是我的手机
const myPhone = new FakeStarFactory()
// 让它拥有操作系统
const myOS = myPhone.createOS()
// 让它拥有硬件
const myHardWare = myPhone.createHardWare()
// 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
myOS.controlHardWare()
// 唤醒硬件(输出‘我会用高通的方式去运转’)
myHardWare.operateByOrder()
