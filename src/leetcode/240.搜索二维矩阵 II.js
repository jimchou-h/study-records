/**
 * https://leetcode.cn/problems/search-a-2d-matrix-ii/description/?envType=study-plan-v2&envId=top-100-liked
 */

// Z 字形查找
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
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

// 直接遍历

// 每一行二分查找