/**
 * 已知函数 signFunc(x) 将会根据 x 的正负返回特定值：
 * 如果 x 是正数，返回 1 。
 * 如果 x 是负数，返回 -1 。
 * 如果 x 是等于 0 ，返回 0 。
 * 给你一个整数数组 nums 。令 product 为数组 nums 中所有元素值的乘积。
 */

var arraySign = function(nums) {
  if (nums.includes(0)) return 0
  let result = nums.reduce((sum, cur) => sum = sum * cur, 1)
  return result > 0 ? 1 : -1
};