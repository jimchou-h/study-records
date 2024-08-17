/**
 * https://leetcode.cn/problems/maximum-product-subarray/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  const len = nums.length
  const dp1 = [], dp2 = []
  dp1[-1] = dp2[-1] = 1
  let result = Number.MIN_SAFE_INTEGER
  for (let i = 0; i < len; i++) {
    if (nums[i] == 0) {
      dp1[i] = dp2[i] = 0
      result = Math.max(result, 0)
    } else {
      dp1[i] = Math.max(dp1[i - 1] * nums[i], dp2[i - 1] * nums[i], nums[i])
      // 维护最小数组以便负负得正得到最大收益
      dp2[i] = Math.min(dp1[i - 1] * nums[i], dp2[i - 1] * nums[i], nums[i])
      result = Math.max(result, dp1[i], dp2[i])
    }
  }
  return result
};