// 快速排序算法
// 过程:
//      1.递归，把数组最后拆分成[4], [3], [2], [1]
//      2.在合并过程中不停对比，保证它的有序状态[3, 4], [1, 2]
//      3.这样最终数组合并完之后也是有序的[1, 2, 3, 4]
//      leetcode 140ms 50.6MB

function quickSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  let middle = arr[0],
    left = [],
    middleArr = [],
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
