/**
 * https://leetcode.cn/problems/rotate-array/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 1.使用额外的数组
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  const len = nums.length
  k = k % nums.length
  nums.unshift(...nums.splice(len - k, k))
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  const len = nums.length
  const result = []
  for (let i = 0; i < len; i++) {
    result[(i + k) % len] = nums[i]
  }
  for (let i = 0; i < len; i++) {
    nums[i] = result[i]
  }
};

// 2.环状替换

// 3.数组翻转