/**
 * https://leetcode.cn/problems/move-zeroes/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  // 双指针
  let fast = 0, slow = 0, len = nums.length
  while (fast < len) {
    // 不等于0就交换
    if (nums[fast] !== 0) {
      let temp = nums[slow]
      nums[slow] = nums[fast]
      nums[fast] = temp
      slow++
    }
    fast++
  }
  return nums
};