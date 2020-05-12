// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。
// leetcode 60ms 31.8MB
var isValid = function(s) {
  if (s.length === 0) {
    return true;
  }
  if (s.length % 2 !== 0) {
    return false;
  }
  // arr记录出现次数，left计算出现顺序
  let arr = [],
    left = [];
  arr['('] = arr['{'] = arr['['] = 0;
  let map = new Map();
  map.set(')', '(');
  map.set(']', '[');
  map.set('}', '{');
  for (let i = 0, len = s.length; i < len; i++) {
    if (typeof arr[s[i]] !== 'number') {
      let match = map.get(s[i])
      if (arr[match] === 0 || match !== left[0]) {
        return false;
      } else {
        arr[match]--;
        left.shift();
      }
    } else {
      arr[s[i]]++;
      left.unshift(s[i]);
    }
  }
  return arr['('] > 0 || arr['['] > 0 || arr['{'] > 0 ? false : true;
};

// 看到的创新解法自己用js实现，效率一般般
var isValid = function(s) {
  if (s.length === 0) {
    return true;
  }
  if (s.length % 2 !== 0) {
    return false;
  }
  let half = s.length / 2,
    i = 0;
  while (i < half && s.length !== 0) {
    s = s.replace('()', '');
    s = s.replace('{}', '');
    s = s.replace('[]', '');
    i++;
  }
  return s.length === 0;
};
