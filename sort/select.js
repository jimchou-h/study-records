// 选择排序算法
// 原理:
//      1.遍历获取数组的最小（大）值
//      2.依次与数组的（倒数）第一第二.....位交换位置
//      leetcode 1964ms 40.8MB
function selectSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let pos = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[pos] > arr[j]) {
        pos = j;
      }
    }
    let tmp = arr[i];
    arr[i] = arr[pos];
    arr[pos] = tmp;
  }
}

//      优化，每轮同时取最大和最小值，效率快原来差不多一倍,但这个算法本身效率还是太低，不大推荐
//      leetcode 1140ms 40.9MB
function selectSort(arr) {
  for (let i = 0, len = arr.length; i < len; i++, len--) {
    // 小优化...好像没多大作用
    if (len - i == 2) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
      return arr
    }

    let minSize = i,
      maxSize = i;
    for (let j = i; j < len; j++) {
      if (arr[j] > arr[maxSize]) {
        maxSize = j;
        continue;
      }
      if (arr[j] < arr[minSize]) {
        minSize = j;
        continue;
      }
    }
    // 防止最大值在最左边而最小值先交换而导致的数值错误
    if (i == maxSize) {
      maxSize = minSize
    }

    let temp = arr[i];
    arr[i] = arr[minSize];
    arr[minSize] = temp;

    // 最大值在左边和最小值在右边只需要做一次交换
    if (minSize == len - 1 && maxSize == i) {
      continue;
    }

    temp = arr[len - 1];
    arr[len - 1] = arr[maxSize];
    arr[maxSize] = temp;
  }
  return arr;
};
