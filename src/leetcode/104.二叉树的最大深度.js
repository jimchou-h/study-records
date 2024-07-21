/**
 * 给定一个二叉树 root ，返回其最大深度。
 * 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。
 */

var maxDepth = function (root) {
  if (!root) return 0
  let result = 0
  let dfs = (node, level = 1) => {
      if (node.left) {
          dfs(node.left, level + 1)
      }
      if (node.right) {
          dfs(node.right, level + 1)
      }
      if (!node.left && !node.right) {
          result = Math.max(result, level)
      }
  }
  dfs(root)
  return result
};