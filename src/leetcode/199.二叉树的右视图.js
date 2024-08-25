/**
 * https://leetcode.cn/problems/binary-tree-right-side-view/solutions/213494/er-cha-shu-de-you-shi-tu-by-leetcode-solution/?envType=study-plan-v2&envId=top-100-liked
 */

// 广度优先遍历
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
  if (!root) {
    return []
  }
  const result = []
  let arr = [root]
  while (arr.length) {
    const next = []
    for (let i = 0, len = arr.length; i < len; i++) {
      const node = arr[i]
      if (i === len - 1) {
        result.push(node.val)
      }
      node.left && next.push(node.left)
      node.right && next.push(node.right)
    }
    arr = next
  }
  return result
};

// 深度优先遍历
// 对右节点进行深度优先遍历
// 每层遇到的第一个节点就是能看到的节点值
// 所以要记录一下已经遍历过的层数
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
  if (!root) {
    return []
  }
  const result = []
  const levelSet = new Set()
  const dfs = (node, level) => {
    if (!levelSet.has(level)) {
      result.push(node.val)
      levelSet.add(level)
    }
    node.right && dfs(node.right, level + 1)
    node.left && dfs(node.left, level + 1)
  }
  dfs(root, 0)
  return result
};