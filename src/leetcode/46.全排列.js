/**
 * https://leetcode.cn/problems/permutations/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 回溯
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const usedMap = new Map() // 记录使用过的数字
  const len = nums.length
  const result = []
  const dfs = (path) => {
    if (path.length === len) {
      result.push([...path])
      return
    }

    for (let num of nums) {
      if (!usedMap.has(num)) {
        usedMap.set(num, 1)
        path.push(num)
        dfs(path)
        path.pop(num)
        usedMap.delete(num)
      }
    }
  }

  dfs([])
  return result
};