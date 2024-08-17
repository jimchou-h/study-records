/**
 * https://leetcode.cn/problems/n-queens/description/
 */

// 回溯
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let dp = new Array(n).fill(0).map(() => new Array(n).fill("."));
  const result = [];
  let queenNum = n;

  // 检测位置是否可以放皇后
  const checkPosition = (x, y) => {
    // 检测上方
    let tx = x;
    while (--tx > -1) {
      if (dp[tx][y] === "Q") {
        return false;
      }
    }
    // 检测上斜左
    let lx = x,
      ly = y;
    while (--lx > -1 && --ly > -1) {
      if (dp[lx][ly] === "Q") {
        return false;
      }
    }
    // 检测上斜右
    let rx = x,
      ry = y;
    while (--rx > -1 && ++ry < n) {
      if (dp[rx][ry] === "Q") {
        return false;
      }
    }
    return true;
  };
  const pushResult = () => {
    let newDp = [];
    for (let i = 0; i < n; i++) {
      newDp[i] = dp[i].join("");
    }
    result.push(newDp);
  };
  const backtrack = (line) => {
    if (line === n) {
      pushResult();
      return;
    }
    for (let i = 0; i < n; i++) {
      if (line === 0 || (line > 0 && checkPosition(line, i))) {
        dp[line][i] = "Q";
        backtrack(line + 1);
        dp[line][i] = ".";
      }
    }
  };
  backtrack(0);
  return result;
};