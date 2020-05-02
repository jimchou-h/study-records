// 冒泡排序算法（效率非常低）
// 原理:
//      1.遍历将相同的两个值进行比较，前者比后者大就交换位置
//      2.此过程最多需要N - 1次，N为数组的长度减一次
//      leetcode 4708ms 40.4MB
function bubbleSort(arr) {
  let tmp;
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    // 小优化：len - 1 - i 每次循环过后数组尾部必然是最大的数字，因此减掉i不进行重复比较
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
}