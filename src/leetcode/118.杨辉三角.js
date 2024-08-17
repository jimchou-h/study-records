/**
 * https://leetcode.cn/problems/pascals-triangle/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 数学
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  const result = [[1]]
  for (let i = 1; i < numRows; i++) {
    const array = new Array(i + 1).fill(1)
    for (let j = 1; j < i; j++) {
      array[j] = result[i - 1][j - 1] + result[i - 1][j]
    }
    result.push(array)
  }
  return result
};