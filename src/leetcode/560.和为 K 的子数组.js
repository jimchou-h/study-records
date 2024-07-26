/**
 * https://leetcode.cn/problems/subarray-sum-equals-k/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 前缀和加哈希表
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  // mp是用来保存前缀和以及其出现次数
  const mp = new Map()
  mp.set(0, 1)
  // 使用pre变量保存前缀和，便于循环统计
  let pre = 0, result = 0
  for (let i = 0, len = nums.length; i < len; i++) {
    pre += nums[i]
    // 只要mp中存在pre - k，就说明至少存在一个子数组的和为k
    const count = mp.get(pre - k) || 0
    if (count !== 0) {
      result += count
    }
    mp.set(pre, (mp.get(pre) || 0) + 1)
  }
  return result
};

// 枚举，会超时
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  let result = 0
  for (let i = 0, len = nums.length; i < len; i++) {
    let sum = 0
    for (let j = i; j >= 0; j--) {
      sum += nums[j]
      if (sum === k) {
        result += 1
      }
    }
  }
  return result
};