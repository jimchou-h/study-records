/**
 * 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
 * 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
 * 返回 你能获得的 最大 利润 。
 */

// 动态规划思想，细分到子问题，只要第一天买第二天又收益就加进去
// dp[i] = Math.max(dp[i - 1], dp[i - 1] + (prices[i] - prices[i - 1]))
var maxProfit = function (prices) {
  const len = prices.length;
  const dp = [0];
  for (let i = 1; i < len; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 1] + (prices[i] - prices[i - 1]));
  }
  return dp[len - 1];
};
