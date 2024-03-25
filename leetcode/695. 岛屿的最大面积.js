/**
 * 给你一个大小为 m x n 的二进制矩阵 grid 。
 * 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。
 * 岛屿的面积是岛上值为 1 的单元格的数目。
 *计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。
 */

// 深度优先遍历
var maxAreaOfIsland = function (grid) {
  let result = 0;

  // 计算区域
  const countArea = (i, j) => {
    // 判断边界情况以及为0的情况
    if (!grid[i] || !grid[i][j]) return 0;

    // 已经计算过重置为0
    grid[i][j] = 0;

    return (
      1 +
      countArea(i - 1, j) +
      countArea(i + 1, j) +
      countArea(i, j - 1) +
      countArea(i, j + 1)
    );
  };

  for (let i = 0, len = grid.length; i < len; i++) {
    for (let j = 0, len = grid[i].length; j < len; j++) {
      if (grid[i][j] === 1) {
        result = Math.max(result, countArea(i, j));
      }
    }
  }

  return result;
};
