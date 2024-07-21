// 堆排序
// leetcode 112ms 40.8MB
function heapSort(arr) {
  let len = arr.length;
  // 把一个无序数组变成堆
  // 寻找最后一个非叶子节点，因为假设非叶子节点下标为n，它的叶子节点就是2n+1和2n+2。并且由于堆的概念，所以这个非叶子节点前面都是非叶子节点。
  for (let i = Math.floor(len / 2 - 1); i > -1; i--) {
    // 由下到上对每个非叶子节点进行调整，确保他们符合堆的概念，遍历完就可以生成一个堆
    adjustHeap(arr, i, len);
  }
  for (let j = len - 1; j > 0; j--) {
    // 此时arr是一个最大堆，所以a[0]就是数组中的最大值，将它与最后一位替换
    swap(arr, 0, j);
    // 再次进行堆排序让a[0]现在的值沉底就可以获取第二大的值
    // 最后一位已经排好序，所以不参与计算
    adjustHeap(arr, 0, j);
  }
  return arr;
}

// 让非叶子节点的值一只和它的叶子节点的值比较，让它后面大的值能够浮上来
// 无序数组变成最大堆需要从下到上每个非叶子节点都执行一次该方法
function adjustHeap(arr, i, len) {
  let temp = arr[i];
  for (let k = 2 * i + 1; k < len; k = 2 * k + 1) {
    if (k + 1 < len && arr[k] < arr[k + 1]) {
      k++;
    }
    if (arr[k] > temp) {
      arr[i] = arr[k];
      i = k;
    } else {
      break;
    }
  }
  arr[i] = temp;
}

// 元素的交换
function swap(arr, start, end) {
  let temp = arr[start];
  arr[start] = arr[end];
  arr[end] = temp;
}