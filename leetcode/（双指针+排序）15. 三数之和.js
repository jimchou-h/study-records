/**
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 
 * 请你返回所有和为 0 且不重复的三元组。
 */

// 双指针
var threeSum = function(nums) {
  const result = []
  
  // 排序后面去重可以跳过重复元素，达到结果去重的效果
  nums = nums.sort((a, b) => a - b)
  
  for (let i = 0, len = nums.length; i < len; i++) {
    if (i > 0) {
      while (nums[i] === nums[i - 1]) i++
      if (i >= len) break
    }
    let left = i + 1, right = len - 1
    while (left < right) {
      const total = nums[i] + nums[left] + nums[right]
      if (total === 0) {
        result.push([nums[i], nums[left], nums[right]])
        left++
        right--
        if (left > i + 1) {
          while (nums[left] === nums[left - 1]) left++
        }
        if (right < len - 1) {
          while (nums[right] === nums[right + 1]) right--
        }
      } else if (total > 0) {
        right--
      } else {
        left++
      }
    }
  }
  
  return result
};

// 第二种（可以忽略）
var threeSum = function(nums) {
  const result = []
  
  // 排序后面去重可以跳过重复元素，达到结果去重的效果
  nums = nums.sort((a, b) => a - b)
  const map = new Map()
  nums.forEach((num, index) => {
    map.set(num, index)
  })
  for (let i = 0, len = nums.length; i < len; i++) {
    while (i > 0 && nums[i] === nums[i - 1]) i++
    if (i >= len) break
    for (let j = i + 1; j < len; j++) {
      while (j > i + 1 && nums[j] === nums[j - 1]) j++
      if (j >= len) break
      const index = map.get(-nums[i] - nums[j])
      if (index || index === 0) {
        if (index > j) {
          result.push([nums[i], nums[j], nums[index]])
        }
      }
    }
  }
  
  return result
};