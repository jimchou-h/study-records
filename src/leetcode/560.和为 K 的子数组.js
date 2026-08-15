/**
 * https://leetcode.cn/problems/subarray-sum-equals-k/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：正常是 O(n ^2)，优化思路是通过前缀和来计算各个字段的和
 * 比如 [1, 2, 3] k = 5，那么当 index 到 2 时，pre = 6，pre - k = 1，前缀和中有个 mp(1, 1)，所以结果加1
 */

// 前缀和加哈希表
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  // mp是用来保存前缀和以及其出现次数
  const mp = new Map();
  mp.set(0, 1);
  // 使用pre变量保存前缀和，便于循环统计
  let pre = 0,
    result = 0;
  for (let i = 0, len = nums.length; i < len; i++) {
    pre += nums[i];
    // 只要mp中存在pre - k，就说明至少存在一个子数组的和为k
    const count = mp.get(pre - k) || 0;
    if (count !== 0) {
      result += count;
    }
    mp.set(pre, (mp.get(pre) || 0) + 1);
  }
  return result;
};

// O(n^2)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let result = 0;
  for (let i = 0, len = nums.length; i < len; i++) {
    let sum = 0;
    for (let j = i; j >= 0; j--) {
      sum += nums[j];
      if (sum === k) {
        result += 1;
      }
    }
  }
  return result;
};
