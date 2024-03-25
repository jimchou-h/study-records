/**
 * 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 */

// 1.使用额外的数组
var rotate = function(nums, k) {
  const len = nums.length
  k = k % nums.length
  nums.unshift(...nums.splice(len - k, k))
  return nums
};

// 2.环状替换

// 3.数组翻转