// 插入排序算法
// 过程:
//      1.递归，把数组最后拆分成[4], [3], [2], [1]
//      2.在合并过程中不停对比，保证它的有序状态[3, 4], [1, 2]
//      3.这样最终数组合并完之后也是有序的[1, 2, 3, 4]
//      leetcode 204ms 50.7MB
function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  }
  let middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else if (left[0] > right[0]) {
      result.push(right.shift())
    } else {
      result.push(left.shift())
      result.push(right.shift())
    }
  }
  while (left.length) {
    result.push(left.shift())
  }
  while (right.length) {
    result.push(right.shift())
  }
  return result
}
