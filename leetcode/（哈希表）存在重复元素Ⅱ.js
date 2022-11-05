/**
 * 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。
 */

var containsNearbyDuplicate = function(nums, k) {
  let map = new Map()
  for (let i = 0, len = nums.length; i < len; i++) {
    const index = map.get(nums[i])
    if (index || index === 0) {
        if (Math.abs(index - i) <= k) return true
    }
    map.set(nums[i], i)
  }
  return false
};