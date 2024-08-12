/**
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 其实用变量存也一样，思路一致
// 用minPrice记录前面的最小值，然后减去即可
var maxProfit = function(prices) {
  let minPrice = prices[0], max = 0
  for (let i = 1, len = prices.length; i < len; i++) {
    max = Math.max(max, prices[i] - minPrice)
    minPrice = Math.min(minPrice, prices[i])
  }
  return max
};

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

