/**
 * https://leetcode.cn/problems/spiral-matrix/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 模拟
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  const m = matrix.length, n = matrix[0].length
  let top = 0, left = 0, right = n - 1; bottom = m - 1
  const result = []
  while (true) {
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i])
    }
    if (++top > bottom) break;
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right])
    }
    if (--right < left) break;
    for (let i = right; i >= left; i--) {
      result.push(matrix[bottom][i])
    }
    if (--bottom < top) break;
    for (let i = bottom; i >= top; i--) {
      result.push(matrix[i][left])
    }
    if (++left > right) break;
  }
  return result
};