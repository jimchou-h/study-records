/**
 * 给你一个由 n 个元素组成的整数数组 nums 和一个整数 k 。
 * 请你找出平均数最大且 长度为 k 的连续子数组，并输出该最大平均数。
 * 任何误差小于 10-5 的答案都将被视为正确答案。
 */

// 滑动窗口
var findMaxAverage = function(nums, k) {
  let totalForK = 0
  for (let i = 0; i < k; i++) {
    totalForK += nums[i]
  }
  let max = totalForK
  for (let i = k, len = nums.length; i < len; i++) {
    totalForK = totalForK + nums[i] - nums[i - k]
    max = Math.max(max, totalForK)
  }
  return (max / k).toFixed(5)
}

// 前缀和
var findMaxAverage = function(nums, k) {
  const plus = [nums[0]]
  for (let i = 1, len = nums.length; i < len; i++) {
    plus[i] = plus[i - 1] + nums[i]
  }
  if (nums.length === k) {
    return (plus[plus.length - 1] / k).toFixed(5)
  }
  let max = plus[k - 1]
  for (let i = k, len = plus.length; i < len; i++) {
    max = Math.max(max, plus[i] - plus[i - k])
  }
  return (max / k).toFixed(5)
};
