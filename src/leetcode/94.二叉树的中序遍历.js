/**
 * https://leetcode.cn/problems/binary-tree-inorder-traversal/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 中序遍历是左中右顺序
// 递归
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  const result = []
  const dfs = (node) => {
    if (!node) {
      return
    }
    node.left && dfs(node.left)
    result.push(node.val)
    node.right && dfs(node.right)
  }
  dfs(root)
  return result
};

// 迭代
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  const stack = [], result = []
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    let node = stack.pop()
    result.push(node.val)
    if (node.right) {
      root = node.right
    }
  }
  return result
};