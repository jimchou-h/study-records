/**
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
 */

// 动态规划
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length < 2) return s;

  let maxi = 0,
    maxj = 0;
  const len = s.length;

  // 建立dp数组
  let dp = new Array(len);
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len).fill(false);
    // 单个字符必为回文串
    dp[i][i] = true;
  }

  // dp[i][j] = s[i] === s[j] && ((j - i < 3) || dp[i + 1][j - 1])
  for (let j = 1; j < len; j++) {
    for (let i = 0; i < j; i++) {
      // 根据转换方程判断
      if (s[i] !== s[j]) {
        dp[i][j] = false;
      } else {
        if (j - i < 3 || dp[i + 1][j - 1]) {
          dp[i][j] = true;

          // 记录最大回文子串
          if (j - i + 1 > maxj - maxi + 1) {
            maxi = i;
            maxj = j;
          }
        }
      }
    }
  }

  return s.slice(maxi, maxj + 1);
};
