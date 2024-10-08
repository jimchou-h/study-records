/**
 * https://leetcode.cn/problems/minimum-path-sum/?envType=study-plan-v2&envId=top-100-liked
 */

// 动态规划
// dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  const m = grid.length, n = grid[0].length
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  dp[0][0] = grid[0][0]
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0]
  }
  for (let i = 1; i < n; i++) {
    dp[0][i] = dp[0][i - 1] + grid[0][i]
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }
  return dp[m - 1][n - 1]
};