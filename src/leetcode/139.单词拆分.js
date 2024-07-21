/**
 * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s
 * 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用
 */

// 动态规划
var wordBreak = function(s, wordDict) {
  const len = s.length

  // 建立dp数组
  const dp = new Array(len).fill(false)
  dp[-1] = true

  // dp[i] = dp[j] && check(j + 1, i + 1）
  // j应该从-1开始，考虑到字符从0开始的情况
  for (let i = 0; i < len; i++) {
    for (let j = -1; j < i; j++) {
      if (dp[j] && wordDict.includes(s.slice(j + 1, i + 1))) {
        dp[i] = true
      }
    }
  }

  return dp[len - 1]
};