/**
 * https://leetcode.cn/problems/number-of-islands/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 深度优先遍历
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  const clearArea = (i, j) => {
    if (!grid[i] || !grid[i][j] || (grid[i][j] == "0")) {
      return
    }
    grid[i][j] = "0"

    const directions = [[0, 1], [1, 0], [-1, 0], [0, -1]]
    for (let direction of directions) {
      clearArea(i + direction[0], j + direction[1])
    }
  }

  let result = 0
  for (let i = 0, len = grid.length; i < len; i++) {
    for (let j = 0, len2 = grid[0].length; j < len2; j++) {
      if (grid[i][j] === "1") {
        ++result
        clearArea(i, j)
      }
    }
  }
  return result
};