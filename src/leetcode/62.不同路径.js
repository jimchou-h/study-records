/**
 * https://leetcode.cn/problems/unique-paths/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 动态规划
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1
  }
  for (let i = 0; i < n; i++) {
    dp[0][i] = 1
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // dp[i][j]等于上边和左边的次数之和
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
};

// dfs（超时版）
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  let result = 0
  const dfs = (x, y) => {
    if (x === m || y === n) {
      return
    }
    if (x === m - 1 && y === n - 1) {
      ++result
      return
    }
    dfs(x + 1, y)
    dfs(x, y + 1)
  }
  dfs(0, 0)
  return result
};