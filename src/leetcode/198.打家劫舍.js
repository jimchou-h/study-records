/**
 * https://leetcode.cn/problems/house-robber/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length <= 2) {
    return Math.max(...nums)
  }
  const dp = [nums[0], Math.max(nums[0], nums[1])]
  for (let i = 2, len = nums.length; i < len; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
  }

  return dp[dp.length - 1]
};