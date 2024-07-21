/**
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
 * 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 */

// 动态规划
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length,
    n = text2.length;

  // +1是为了增加一层边界，这样不用判断超出的情况
  // 所以下面从1开始
  const dp = new Array(m + 1).fill([]);
  for (let i = 0, len = dp.length; i < len; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }

  // dp[i][j] = dp[i - 1][j - 1] + 1; => text1[i - 1] === text2[j - 1]
  // dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); => text1[i - 1] !== text2[j - 1]
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
};
