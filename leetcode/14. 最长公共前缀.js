// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀，返回空字符串 ""。
// leetcode 56ms 36.2MB
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) {
    return "";
  }
  if (strs.length === 1) {
    return strs[0];
  }
  let [a, ...b] = strs, len = a.length, i = 1;
  while (i < len + 1) {
    let aim = a.substring(0, i)
    let result = b.every((item) => {
      return item.indexOf(aim) === 0
    })
    if (!result) {
      return a.substring(0, i - 1)
    }
    i++;
  }
  return a;
};
