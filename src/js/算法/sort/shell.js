// 希尔排序算法
// 原理:
//      1.增量值初始值为数组长度的一半向下取整，然后一直除以2向下取整直到为0
//      2.以增量值为间隔获取数组的元素对它们进行插入排序
//      leetcode 124ms 40.4MB
function shellSort (arr) {
  let len = arr.length;
  let increment = Math.floor(len/2); // 增量值
  while (increment != 0) {
      // 以增量值为起点进行循环
      for (let i = increment; i < len; i++) {
        var temp = arr[i]
        // 插入排序，遇到大的值就往后移直到没有
        for(var j = i - increment; j >= 0 && temp < arr[j]; j -= increment) {
          arr[j + increment] = arr[j]
        }
        arr[j + increment] =  temp;
      }
      increment = Math.floor(increment / 2)
  }
  return arr;
}