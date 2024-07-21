// 计数排序
// 原理:
//      1.前提：只能用在数组的值都为正整数的情况下，因为其它值时无法遍历出来的
//      2.通过另一个数组进行计算,item是出现的次数,index是数组的值
//      3.适用于一定范围的整数排序。在取值范围不是很大的情况下，它的性能在某些情况甚至快过那些O(nlogn)的排序
function countSort(arr) {
  // 求出数组最大值以确认数组的长度
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max)
      max = arr[i];
  }
  // 使用coutArray数组计算次数
  let coutArray = (new Array(max + 1)).fill(0);
  for (let i = 0; i < arr.length; i++) {
    coutArray[arr[i]]++;
  }
  // 生成新结果数组
  let index = 0;
  let sortedArray = [];
  for (let i = 0; i < coutArray.length; i++) {
    for (let j = 0; j < coutArray[i]; j++) {
      sortedArray[index++] = i;
    }
  }
  return sortedArray;
}
