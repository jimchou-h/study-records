// content是包含资源文件内容的字符串
module.exports = function (content) {

	// 获取用户传入选项
	// const options = this.getOptions()
	
	// 同步
	content = content.replace(/const/g, 'var')
	content = content.replace('张三', '李四')
	this.callback(null, content)
	
	// 异步 -> 获取异步回调函数
	// const callback = this.async()
	// // 模拟异步操作
	// setTimeout(() => {
	// 	// 第一个参数是错误信息，第二个参数是处理后的内容
	// 	callback(null, content)
	// }, 1000)
}


// 设置了的话content是接收的就是Buffer类型而不是字符串类型了
// module.exports.raw = true;