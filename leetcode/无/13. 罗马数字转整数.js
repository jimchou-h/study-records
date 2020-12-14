// 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。
// 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。
// 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
// I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
// X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
// C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
// 给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。
// leetcode 156ms 40.2MB
var romanToInt = function(s) {
  let arr = [],
    result = 0;
  arr['I'] = 1;
  arr['V'] = 5;
  arr['X'] = 10;
  arr['L'] = 50;
  arr['C'] = 100;
  arr['D'] = 500;
  arr['M'] = 1000;
  for (let i = 0, len = s.length; i < len; i++) {
    let cur = s[i],
      next = s[i + 1];
    switch (cur) {
      case 'I':
        if (next === 'V' || next === 'X') {
          result--;
        } else {
          result++;
        }
        break;
      case 'X':
        if (next === 'L' || next === 'C') {
          result -= 10;
        } else {
          result += 10;
        }
        break;
      case 'C':
        if (next === 'D' || next === 'M') {
          result -= 100;
        } else {
          result += 100;
        }
        break;
      default:
        result += arr[s[i]];
    }
  }
  return result;
};

// 优化!!!!!
var romanToInt = function(s) {
  let result = 0;
  // 用map保存特殊值
  const table2 = new Map();
  table2.set('IV', 4);
  table2.set('IX', 9);
  table2.set('XL', 40);
  table2.set('XC', 90);
  table2.set('CD', 400);
  table2.set('CM', 900);
  for (let i = 0, len = s.length; i < len; i++) {
    // 先匹配两个字符
    let curNext = s[i] + s[i + 1];
    // 有特殊情况就按特殊情况处理
    if (table2.has(curNext)) {
      result += table2.get(curNext);
      i++;
    } else {
    // 没有就按单个字符处理
      result += transfer(s[i])
    }
  }
  return result;
};

function transfer(num) {
  switch (num) {
    case 'I':
      return 1;
    case 'V':
      return 5;
    case 'X':
      return 10;
    case 'L':
      return 50;
    case 'C':
      return 100;
    case 'D':
      return 500;
    case 'M':
      return 1000;
    default:
      return 0;
  }
}
