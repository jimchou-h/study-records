/**
 * https://leetcode.cn/problems/path-sum-iii/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 深度优先遍历 O(N2)
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function(root, targetSum) {
  let result = 0
  const countPath = (node, num) => {
    if (!node) {
      return
    }
    num += node.val
    if (num === targetSum) {
      ++result
    }
    countPath(node.left, num)
    countPath(node.right, num)
  }
  const dfs = (node) => {
    if (!node) {
      return
    }
    dfs(node.left)
    countPath(node, 0)
    dfs(node.right)
  }
  dfs(root)
  return result
};

// 前缀和 + 深度优先遍历 O(N)
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function(root, targetSum) {
  const map = new Map()
  map.set(0, 1)

  const dfs = (node, pre) => {
    if (!node) {
      return 0
    }

    let ret = 0
    pre += node.val

    ret = map.get(pre - targetSum) || 0
    // 记录前缀和
    // 如果 pre - targetSum 存在，则说明存在一条路径
    map.set(pre, (map.get(pre) || 0) + 1)
    ret += dfs(node.left, pre)
    ret += dfs(node.right, pre)
    // 还原，类似回溯思想
    map.set(pre, (map.get(pre) || 0) - 1)
    return ret
  }
  return dfs(root, 0)
};