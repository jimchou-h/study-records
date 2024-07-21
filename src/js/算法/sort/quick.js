// 快速排序算法
// 原理:
//      1.取一个中间值，把小于它的值放在左边数组，大于它的放在右边数组，通过数组的concat方法把三者合并起来
//      2.对1过程递归调用
//      leetcode 140ms 50.6MB

function quickSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  let middle = arr[0],
    left = [],
    middleArr = [],++
    right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middle) {
      left.push(arr[i])
    } else if (arr[i] === middle) {
      middleArr.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(middleArr, quickSort(right));
}
