/**
 * https://leetcode.cn/problems/perfect-squares/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  const f = new Array(n + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    let minNum = Number.MAX_VALUE
    for (let j = 1; j * j <= i; j++) {
      minNum = Math.min(minNum, f[i - j * j] + 1)
    }
    f[i] = minNum
  }
  return f[n]
};