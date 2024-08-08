/**
 * https://leetcode.cn/problems/maximum-subarray/description/?envType=study-plan-v2&envId=top-100-liked
 */


// 动态规划
/**
 * @param {number[]} nums
 * @return {number}
 */
// dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
var maxSubArray = function(nums) {
  if (nums.length === 1) {
    return nums[0]
  }
  let result = nums[0]
  const dp = [nums[0]]
  for (let i = 1, len = nums.length; i < len; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
    result = Math.max(dp[i], result)
  }
  return result
};

// 使用变量替代dp
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  if (nums.length === 1) return nums[0]
  let result = nums[0], preMax = nums[0]
  for (let i = 1, len = nums.length; i < len; i++) {
    preMax = Math.max(nums[i], preMax + nums[i])
    result = Math.max(preMax, result)
  }
  return result
};

// 分治