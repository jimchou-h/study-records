/**
 * https://leetcode.cn/problems/diameter-of-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  if (!root) {
    return 0
  }
  let max = 0
  const countLen = (node, map) => {
    if (!node) {
      return -1
    }
    const L = countLen(node.left, map, max) + 1
    const R = countLen(node.right, map, max) + 1
    max = Math.max(max, L + R)
    return Math.max(L, R)
  }

  countLen(root)

  return max
};