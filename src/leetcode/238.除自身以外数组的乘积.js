/**
 * https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  const len = nums.length
  const leftPlusArr = [], rightPlusArr = []
  leftPlusArr[-1] = 1
  rightPlusArr[len] = 1
  for (let i = len - 1; i >= 0; i--) {
    rightPlusArr[i] = rightPlusArr[i + 1] * nums[i]
  }
  const result = []
  for (let i = 0; i < len; i++) {
    leftPlusArr[i] = leftPlusArr[i - 1] * nums[i]
    result[i] = leftPlusArr[i - 1] * rightPlusArr[i + 1]
  }
  return result
};