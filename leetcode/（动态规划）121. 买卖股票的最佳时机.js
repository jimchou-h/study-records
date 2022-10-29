/**
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0
 */

var maxProfit = function(prices) {
  // minPrice 记录股票最低的时候
  // result 记录利润最高的时候
  let minPrice = [prices[0]], result = [0]
  for (let i = 1, len = prices.length; i < len; i++) {
    result[i] = Math.max(result[i - 1], prices[i] - minPrice[i - 1])
    minPrice[i] = Math.min(minPrice[i - 1], prices[i])
  }
  return result[result.length - 1]
};

// 其实用变量存也一样，思路一致
var maxProfit = function(prices) {
  let minPrice = prices[0], max = 0
  for (let i = 1, len = prices.length; i < len; i++) {
    max = Math.max(max, prices[i] - minPrice)
    minPrice = Math.min(minPrice, prices[i])
  }
  return max
};