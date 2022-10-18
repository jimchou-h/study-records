/**
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数
 */

var isPalindrome = function(x) {
  if (x < 0) return false;
  if (x < 10) return true;
  x = x + "";
  let i = 0,
    j = x.length - 1;
  // 两指针法进行比较
  while (i < j) {
    if (x[i] !== x[j]) {
      return false
    }
    i++;
    j--;
  }
  return true;
};
