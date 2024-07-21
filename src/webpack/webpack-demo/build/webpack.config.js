const path = require("path");
const TestPlugin = require("../plugin/test-plugin.js");

module.exports = {
  mode: "development", // development production
  entry: path.resolve(__dirname, "..", "./src/index.js"), //入口文件
	// 输出文件配置
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "[name][chunkhash:7].js",
  },
  devtool: "source-map", //防止干扰源文件
  module: {
    rules: [
      {
        test: /\.js/,
        loader: path.resolve(__dirname, "../loader/test-loader.js"),
        options: {
          test: true,
        },
      },
      // {
      //   test: /\.js/,
      //   loader: path.resolve(__dirname, "../loader/console-loader.js"),
      //   options: {
      //     test: true,
      //   },
      // },
      {
        test: /\-static\.(png|jpg)$/i,
        loader: path.resolve(__dirname, "../loader/test-file-loader.js"),
        options: {
          test: true,
        },
      },
      // {
      //   test: /\-static\.(png|jpg)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: "resource/[name][contentHash:7].[ext]",
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [new TestPlugin()],
};
