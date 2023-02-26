class CopyRightPlugin {

	apply(compiler) {
		
		// 通过监听webpack生命周期来实现相应的功能

		// 同步
		// compiler.hooks.emit.tap('CopyRightPlugin', (compilation) => {
		// 	compilation.assets['copyright.txt'] = {
		// 		source: function() {
		// 			return 'this is my copyright'; // //文件内容
		// 		},
		// 		size: function() {
		// 			return 20; // 文件大小
		// 		}
		// 	}
		// })

		// 异步
		compiler.hooks.emit.tapAsync('CopyRightPlugin', (compilation, next) => {
			setTimeout(_ => {
				compilation.assets['copyright.txt'] = {
					source: function() {
						return 'this is my copyright' // //文件内容
					},
					size: function() {
						return 20; // 文件大小
					}
				}
				next()
			}, 1000)
		})

	}

}

module.exports = CopyRightPlugin;
