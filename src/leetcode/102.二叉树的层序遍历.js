/**
 * https://leetcode.cn/problems/binary-tree-level-order-traversal/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) {
    return []
  }
  let arr = [root]
  const result = []
  while (arr.length) {
    let next = []
    result.push(arr.map((node) => {
      if (node.left) {
        next.push(node.left)
      }
      if (node.right) {
        next.push(node.right)
      }
      return node.val
    }))
    arr = next
  }
  return result
};