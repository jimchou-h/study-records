/**
 * https://leetcode.cn/problems/trapping-rain-water/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 1.动态规划
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  const len = height.length
  const leftMaxArr = [], rightMaxArr = []

  let result = 0

  leftMaxArr[0] = height[0]
  rightMaxArr[len - 1] = height[len - 1]

  for (let i = 1; i < len - 1; i++) {
    leftMaxArr[i] = Math.max(leftMaxArr[i - 1], height[i])
  }
  for (let i = len - 2; i > 0; i--) {
    rightMaxArr[i] = Math.max(rightMaxArr[i + 1], height[i])
  }

  for (let i = 1; i < len - 1; i++) {
    result += Math.min(leftMaxArr[i], rightMaxArr[i]) - height[i]
  }

  return result
};

// 2.双指针
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  const len = height.length

  let leftMax = height[0], rightMax = height[len - 1]
  let result = 0

  let left = 0, right = len - 1

  while (left < right) {
    if (height[left] < height[right]) {
      result += leftMax - height[left]
      left++
      leftMax = Math.max(leftMax, height[left])
    } else {
      result += rightMax - height[right]
      right--
      rightMax = Math.max(rightMax, height[right])
    }
  }

  return result
}