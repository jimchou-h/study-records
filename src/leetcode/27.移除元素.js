/**
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
 * 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素
 */

// 双指针
var removeElement = function (nums, val) {
  let left = 0,
    right = 0;
  for (let i = 0, len = nums.length; i < len; i++) {
    if (nums[right] !== val) {
      nums[left] = nums[right];
      left++;
    }
    right++;
  }
  return left;
};

// 双指针优化（两个指针重合即遍历完成）
var removeElement = function (nums, val) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    if (nums[left] === val) {
      nums[left] = nums[right];
      right--;
    } else {
      left++;
    }
  }
  return left;
};
