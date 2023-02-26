const path = require("path");
const TestPlugin = require("./plugin/test-plugin.js")
console.log(TestPlugin.prototype)

module.exports = {
  mode: "production", //防止代码被压缩
  entry: "./src/index.js", //入口文件
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devtool: "source-map", //防止干扰源文件
	module: {
		rules: [
			{
				test: /\.js/,
				use: path.resolve(__dirname, "./loader/test-loader.js"),
				// options: {
				// 	test: true
				// }
			}
		]
	},
	plugins: [
		new TestPlugin()
	]
};