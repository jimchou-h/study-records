/**
 * 给定一个整数数组，判断是否存在重复元素
 * 如果任意一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 
 */

var containsDuplicate = function(nums) {
  // 比较去重后的长度，如果不一致则有重复数字
  return new Set(nums).size !== nums.length
};

// 方法二，哈希表
// 遍历，用数组key存值，当存在数组key时即有重复元素