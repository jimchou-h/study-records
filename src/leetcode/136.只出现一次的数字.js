/**
 * https://leetcode.cn/problems/single-number/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 数学 - 异或
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let result = 0
  for (let num of nums) {
    result ^= num
  }
  return result
};