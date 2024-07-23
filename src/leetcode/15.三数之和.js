/**
 * https://leetcode.cn/problems/3sum/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {

  const result = []

  // 先排序
  nums.sort((a, b) => a - b)

  // 判断条件是 i <= 0, i大于0不会有符合项
  for (let i = 0, len = nums.length; nums[i] <= 0; i++) {

    // 数字重复直接跳过循环
    if (nums[i] === nums[i - 1]) {
      continue
    }

    let l = i + 1, r = len - 1
    // 一个固定值，另外两个用双指针的形式
    while (l < r) {
      const count = nums[i] + nums[l] + nums[r]
      if (count === 0) {
        result.push([nums[i], nums[l], nums[r]])
        l++
        r--
        // 这里加这个是为了排除 l 和 r 同时加减时还是原来的值的情况，减少重复的情况
        while (nums[l] === nums[l - 1]) {
          l++
        }
        while (nums[r] === nums[r + 1]) {
          r--
        }
      } else if (count < 0) {
        // 如果是单个加减说明该组合不匹配，即使重复也是会跳过，所以这里不用加
        l++
      } else {
        r--
      }
    }
  }

  return result
};