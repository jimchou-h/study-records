/**
 * https://leetcode.cn/problems/set-matrix-zeroes/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：记录 0 位置的 x 和 y，再遍历一遍替换
 * 优化：使用矩阵的第一行和第一列代替方法一中的两个标记数组，但注意一定要先判断第一行和第一列是否需要变为 0，用两个变量维护
 */

// 标记数组
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const m = matrix.length,
    n = matrix[0].length;
  const shouldTurnZeroX = new Set(),
    shouldTurnZeroY = new Set();

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        shouldTurnZeroX.add(i);
        shouldTurnZeroY.add(j);
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (shouldTurnZeroX.has(i) || shouldTurnZeroY.has(j)) {
        matrix[i][j] = 0;
      }
    }
  }
};
