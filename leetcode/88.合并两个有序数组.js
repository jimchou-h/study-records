/**
 * 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
 * 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
 * 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
 */

// 逆向双指针
// 正向的话需要使用新数组
var merge = function (nums1, m, nums2, n) {
  let i = m - 1;
  j = n - 1;
  while (i > -1 && j > -1) {
    if (nums1[i] < nums2[j]) {
      nums1[i + j + 1] = nums2[j];
      j--;
    } else if (nums1[i] >= nums2[j]) {
      nums1[i + j + 1] = nums1[i];
      i--;
    }
  }
  if (j > -1) {
    while (j > -1) {
      nums1[j] = nums2[j];
      j--;
    }
  }
  return nums1;
};
