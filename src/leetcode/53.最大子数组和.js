/**
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组是数组中的一个连续部分。
 */


// 动态规划
var maxSubArray = function(nums) {
  if (nums.length === 1) return nums[0]
  const dp = [nums[0]]
  for (let i = 1, len = nums.length; i < len; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
  }
  return Math.max(...dp)
};
// 使用变量替代dp
var maxSubArray = function(nums) {
  if (nums.length === 1) return nums[0]
  let result = Number.MIN_SAFE_INTEGER, preMax = 0
  for (let i = 0, len = nums.length; i < len; i++) {
    preMax = Math.max(nums[i], preMax + nums[i])
    result = Math.max(preMax, result)
  }
  return result
};

// 分治