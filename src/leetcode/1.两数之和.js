/**
 * https://leetcode.cn/problems/two-sum/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const map = new Map()
  for (let [index, val] of nums.entries()) {
    if (map.has(target - val)) {
      return [map.get(target - val), index]
    }
    map.set(val, index)
  }
};