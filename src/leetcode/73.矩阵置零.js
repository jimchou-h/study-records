/**
 * https://leetcode.cn/problems/set-matrix-zeroes/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 标记数组
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
  const m = matrix.length, n = matrix[0].length
  const shouldTurnZeroX = new Set(), shouldTurnZeroY = new Set()

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        shouldTurnZeroX.add(i)
        shouldTurnZeroY.add(j)
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (shouldTurnZeroX.has(i) || shouldTurnZeroY.has(j)) {
        matrix[i][j] = 0
      }
    }
  }
};