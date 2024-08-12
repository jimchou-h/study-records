/**
 * https://leetcode.cn/problems/search-a-2d-matrix/description/?envType=study-plan-v2&envId=top-100-liked
 */

// z字形查找
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  const m = matrix.length, n = matrix[0].length
  let x = 0, y = n - 1
  while (x < m && y >= 0) {
    if (matrix[x][y] === target) {
      return true
    } else if (matrix[x][y] > target) {
      y--
    } else {
      x++
    }
  }
  return false
};

// 二分查找
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  const n = matrix[0].length
  const index = matrix.findIndex(line => (line[0] <= target) && (line[n - 1] >= target))
  if (index === -1) {
    return false
  }
  const line = matrix[index]
  let left = 0, right = n - 1
  while (left <= right) {
    const mid = left + Math.ceil((right - left) / 2)
    if (line[mid] === target) {
      return true
    } else if (line[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return false
}