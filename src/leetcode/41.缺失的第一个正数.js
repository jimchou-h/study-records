/**
 * https://leetcode.cn/problems/first-missing-positive/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 负值
// 数组内原有的负值设置为n + 1
// 有对应的数就将对应的位置设置为负值
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
  const n = nums.length
  for (let i = 0; i < n; i++) {
    if (nums[i] <= 0) {
      nums[i] = n + 1
    }
  }
  for (let i = 0; i < n; i++) {
    const num = Math.abs(nums[i])
    if (num <= n) {
      nums[num - 1] = -Math.abs(nums[num - 1])
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      return i + 1
    }
  }
  return n + 1
}

// 交换位置
// 将对应的数放到对应的位置上
// 注意有重复的数的话会导致无限循环，所以需要跳过
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
  const len = nums.length
  for (let i = 0; i < len; i++) {
    while (nums[i] > 0 && nums[i] <= len && nums[nums[i] - 1] != nums[i]) {
      let temp = nums[nums[i] - 1]
      nums[nums[i] - 1] = nums[i]
      nums[i] = temp
    }
  }
  for (let i = 0; i < len; i++) {
    if (i + 1 !== nums[i]) {
      return i + 1
    }
  }
  return len + 1
};