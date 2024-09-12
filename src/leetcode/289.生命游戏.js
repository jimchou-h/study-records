/**
 * https://leetcode.cn/problems/game-of-life/description/?envType=study-plan-v2&envId=top-interview-150
 */

// 可以使用额外的空间解决
// 如果不想用额外的空间，可以使用 0 和 1 表示状态，2 和 3 表示下一状态
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function(board) {
  for (let i = 0, len = board.length; i < len; i++) {
    for (let j = 0, len2 = board[0].length; j < len2; j++) {
      let survivingCells = 0
      const direction = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
      for (let [x, y] of direction) {
        if (board[i + x] && [1, 2].includes(board[i + x][j + y])) {
          ++survivingCells
        }
      }

      if (board[i][j] === 0) {
        board[i][j] = survivingCells === 3 ? 3 : 0
      } else {
        board[i][j] = ![2, 3].includes(survivingCells) ? 2 : 1
      }
    }
  }

  for (let i = 0, len = board.length; i < len; i++) {
    for (let j = 0, len2 = board[0].length; j < len2; j++) {
      if (board[i][j] === 2) {
        board[i][j] = 0
      } else if (board[i][j] === 3) {
        board[i][j] = 1
      }
    }
  }

  return board
};