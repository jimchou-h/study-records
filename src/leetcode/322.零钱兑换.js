/**
 * https://leetcode.cn/problems/coin-change/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  const dp = new Array(amount + 1).fill(amount + 1)
  dp[0] = 0

  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      const num = i - coins[j]
      if (num >= 0) {
        if (dp[num] >= 0 && dp[num] <= amount) {
          dp[i] = Math.min(dp[i], dp[num] + 1)
        } 
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount]
};