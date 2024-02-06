/**
 * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s
 * 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用
 */

思路: 动态规划,判断dp[i]是不是一个字符串

function wordBreak(s: string, wordDict: string[]): boolean {
  const len: number = s.length
  const wordDictSet: Set<string> = new Set(wordDict)
  const dp: Array<boolean> = new Array(len + 1).fill(false)
  // 默认dp[0]为true
  dp[0] = true
  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < i; j++) {
			// 说明s[0 ~ i]是一个符合条件的字符串，dp[i]设为true
      if (dp[j] && wordDictSet.has(s.slice(j, i))) {
        dp[i] = true
        break
      }
    }
  }
  return dp[len]
};