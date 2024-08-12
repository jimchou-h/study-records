/**
 * https://leetcode.cn/problems/rotting-oranges/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 多源广度优先搜索
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
  // 记录不新鲜水果位置以及新鲜水果数量
  let notFreshNumPosition = [], freshNum = 0
  for (let i = 0, len = grid.length; i < len; i++) {
    for (let j = 0, len = grid[0].length; j < len; j++) {
      if (grid[i][j] == 1) {
        freshNum++
      } else if (grid[i][j] == 2) {
        notFreshNumPosition.push([i, j])
      }
    }
  }
  // 没有腐烂水果以及新鲜水果数量大于0直接返回
  if (notFreshNumPosition.length === 0 && freshNum > 0) {
    return -1
  }
  // 有腐烂水果以及新鲜水果数量等于0
  if (freshNum === 0) {
    return 0
  }

  // 使用广度优先遍历对新鲜水果进行腐烂
  let result = 0
  while (notFreshNumPosition.length) {
    // 记录下一层腐烂水果位置
    const next = []
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    for (let [x, y] of notFreshNumPosition) {
      for (let direction of directions) {
        const newX = x + direction[0], newY = y + direction[1]
        if (grid[newX] && (grid[newX][newY] == 1)) {
          next.push([newX, newY])
          grid[newX][newY] = 2
          --freshNum
        }
      }
    }
    ++result
    // 新鲜水果数量大于0但是没有扩散的空间了
    if (freshNum > 0 && !next.length) {
      return -1
    }
    if (freshNum === 0) {
      return result
    }
    // 赋值进入下一层循环
    notFreshNumPosition = next
  }
};