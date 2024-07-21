// https://github.com/webpack-contrib/file-loader/blob/master/src/index.js

import path from "path";

import { getOptions, interpolateName } from "loader-utils";
// import { validate } from "schema-utils";

// import schema from "./options.json";
import { normalizePath } from "./utils";

export default function loader(content) {
  const options = getOptions(this);

  // 根据定义的schema，验证options是否符合要求
  // validate(schema, options, {
  //   name: "File Loader",
  //   baseDataPath: "options",
  // });

  const context = options.context || this.rootContext;
  const name = options.name || "[contenthash].[ext]";

  // 根据定义好的格式转成文件名，比如"[contenthash].[ext]"
  const url = interpolateName(this, name, {
    context,
    content,
    regExp: options.regExp,
  });

  let outputPath = url;

  // outputPath是指webpack打包后输出文件的存放路径
  // 如果有指定输出路径，将指定的路径与url拼接
  if (options.outputPath) {
    if (typeof options.outputPath === "function") {
      outputPath = options.outputPath(url, this.resourcePath, context);
    } else {
      // path.posix.join
      outputPath = path.posix.join(options.outputPath, url);
    }
  }

  // __webpack_public_path__ -> output.publicPath
  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  // publicPath是指打包后的文件在浏览器中的访问路径
  if (options.publicPath) {
    if (typeof options.publicPath === "function") {
      publicPath = options.publicPath(url, this.resourcePath, context);
    } else {
      publicPath = `${
        options.publicPath.endsWith("/")
          ? options.publicPath
          : `${options.publicPath}/`
      }${url}`;
    }

    publicPath = JSON.stringify(publicPath);
  }

  // 用户指定自定义函数来对生成的公共路径进行后处理
  if (options.postTransformPublicPath) {
    publicPath = options.postTransformPublicPath(publicPath);
  }

  // 如果emitFile为true（不传默认为true），将处理后的文件输出到指定目录
  if (typeof options.emitFile === "undefined" || options.emitFile) {
    const assetInfo = {};

    if (typeof name === "string") {
      let normalizedName = name;

      const idx = normalizedName.indexOf("?");

      if (idx >= 0) {
        normalizedName = normalizedName.substr(0, idx);
      }

      const isImmutable = /\[([^:\]]+:)?(hash|contenthash)(:[^\]]+)?]/gi.test(
        normalizedName
      );

      if (isImmutable === true) {
        assetInfo.immutable = true;
      }
    }

    assetInfo.sourceFilename = normalizePath(
      path.relative(this.rootContext, this.resourcePath)
    );

    this.emitFile(outputPath, content, null, assetInfo);
  }

  const esModule =
    typeof options.esModule !== "undefined" ? options.esModule : true;

  // 返回给webpack
  // webpack会将其作为模块的内容进行解析处理
  return `${esModule ? "export default" : "module.exports ="} ${publicPath};`;
}

export const raw = true;
