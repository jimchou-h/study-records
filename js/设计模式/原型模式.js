// PS: js本质就是以原型为中心的语言

function Animal() {}

Animal.prototype.eat = function() {
	console.log('吃饭')
}

Animal.prototype.sleep = function() {
	console.log('睡觉')
}

let dog = new Animal()
dog.eat() // 吃饭
dog.sleep() // 睡觉
