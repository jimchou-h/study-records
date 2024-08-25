/**
 * https://leetcode.cn/problems/symmetric-tree/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 递归
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (!root || (!root.left && !root.right)) {
    return true
  }

  const checkIsSame = (leftNode, rightNode) => {
    if (!leftNode && !rightNode) {
      return true
    } else if (!leftNode || !rightNode) {
      return false
    }

    if (leftNode.val === rightNode.val) {
      return checkIsSame(leftNode.left, rightNode.right) && checkIsSame(leftNode.right, rightNode.left)
    } else {
      return false
    }
  }

  return checkIsSame(root.left, root.right)
};

// 迭代
// 广度优先遍历，将对应的节点两两保存到队列中，然后下一次取出来两个遍历