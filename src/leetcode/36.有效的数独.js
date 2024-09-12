/**
 * https://leetcode.cn/problems/valid-sudoku/description/?envType=study-plan-v2&envId=top-interview-150
 */

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  const rows = new Array(9).fill(0).map(() => new Array(9).fill(0))
  const columns = new Array(9).fill(0).map(() => new Array(9).fill(0))
  const subboxes = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)))

  for (let i = 0, len = board.length; i < len; i++) {
    for (let j = 0, len2 = board[i].length; j < len2; j++) {
      const num = board[i][j]
      if (++rows[i][num - 1] > 1 || ++columns[j][num - 1] > 1 || ++subboxes[Math.floor(i / 3)][Math.floor(j / 3)][num - 1] > 1) {
        return false
      }
    }
  }
  return true
};