/**
 * https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 中序遍历
// 使用迭代，搜到符合条件的节点可以直接中断
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  const stack = []
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    --k
    if (k === 0) {
      break
    }
    root = root.right
  }
  return root.val
};