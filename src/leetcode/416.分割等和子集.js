/**
 * https://leetcode.cn/problems/partition-equal-subset-sum/description/?envType=study-plan-v2&envId=top-100-liked
 */

// dfs + 记忆化 耗时长
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  const total = nums.reduce((sum, cur) => sum += cur, 0)
  if (total % 2 !== 0) {
    return false
  }
  const mid = total / 2
  const len = nums.length
  const memo = new Map()

  const dfs = (i, curSum) => {
    if (i === len) {
      return false
    }
    if (curSum === mid) {
      return true
    }
    if (curSum > mid) {
      return false
    }

    if (memo.has(curSum + '&' + i)) {
      return memo.get(curSum)
    }
    const res = dfs(i + 1, curSum) || dfs(i + 1, curSum + nums[i])
    memo.set(curSum + '&' + i, res)
    return res
  }

  return dfs(0, 0)
};

// dp二维数组
// dp[i][j] 表示前i个数字中是否存在和为j的子集
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const total = nums.reduce((sum, cur) => sum += cur, 0)
  if (total % 2 !== 0) {
    return false
  }
  const mid = total / 2
  const len = nums.length

  const dp = new Array(len).fill(0).map(() => new Array(mid + 1).fill(false))
  dp[0][nums[0]] = true
  for (let i = 0; i < len; i++) {
    dp[i][0] = true;
  }

  for (let i = 1; i < len; i++) {
    for (let j = 1; j <= mid; j++) {
      if (j >= nums[i]) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]]
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }

  return dp[len - 1][mid]
}

// dp一位数组优化
// 因为dp[i][j]只和它的上一级有关系，所以可以优化成一维数组
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const total = nums.reduce((sum, cur) => sum += cur, 0)
  if (total % 2 !== 0) {
    return false
  }
  const mid = total / 2
  const len = nums.length

  const dp = new Array(mid + 1).fill(false)
  dp[0] = true

  for (let i = 0; i < len; i++) {
    for (let j = mid; j > 0; j--) {
      if (j >= nums[i]) {
        dp[j] = dp[j] || dp[j - nums[i]]
      }
    }
  }
  return dp[mid]
}