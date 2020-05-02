// 插入排序算法
// 原理:
//      1.将遍历到的元素取出来然后往前比较，如果有元素大于这个值就把他往后移，直到没有
//      2.把取出来的值插到空余的位置上
//      leetcode 828ms 40.4MB
function insertSort(arr) {
  // 第一步
  for (let i = 1, len = arr.length; i < len; i++) {
    let tmp = arr[i];
    for (var j = i - 1; j >= 0 && arr[j] > tmp; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = tmp; // 第二步
  }
  return arr;
}
