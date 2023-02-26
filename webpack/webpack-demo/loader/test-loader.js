module.exports = function (content){
	
	// 同步
  //  console.log(content); // { name: 'hello' }
	// content = content.replace(/const/g, 'var')
	// content = content.replace('张三', '李四')
	// // console.log(JSON.stringify(this.async))
  //  //  return content;
	// this.callback(null, content)
	// console.log(this.callback.toLocaleString())
	
	// 异步
	const callback = this.async()
	// 模拟异步操作
	setTimeout(() => {
		callback(null, content)
	}, 1000)
}