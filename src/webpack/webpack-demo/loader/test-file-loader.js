var _loaderUtils = require("loader-utils");

module.exports = function (content) {
  console.log((0, _loaderUtils.getOptions)(this))
  var options = _loaderUtils.getOptions(this);
  console.log(_loaderUtils, options)
  return ""
}

module.exports.raw = true;