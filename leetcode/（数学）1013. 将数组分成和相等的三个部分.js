/**
 * 题目给你一个整数数组 A，只有可以将其划分为三个和相等的非空部分时才返回 true，否则返回 false
 */

var canThreePartsEqualSum = function(A) {
  //计算数组总和，不是3的倍数肯定不符合 
  let countAll = A.reduce((sum, num) => sum + num);
  if (countAll % 3 !== 0) {
    return false;
  }
  // 当有两段是数组的1/3的值的时候就可以判断为正确了，不过要注意数组总和为0的情况
  let countAim = countAll / 3,
    part = 0,
    count = 0;
  for (let i = 0, len = A.length; i < len; i++) {
    count += A[i];
    if (count === countAim) {
      part++;
      count = 0;
      if (part === 2) {
        return i !== len - 1;
      }
    }
  }
  return false;
};
