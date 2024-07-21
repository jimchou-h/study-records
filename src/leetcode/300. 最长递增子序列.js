/**
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 */

// 动态规划
// dp[i] = max(dp[j]) + 1，其中 0 ≤ j < i 且 num[j] < num[i]
var lengthOfLIS = function(nums) {
  const len = nums.length

  const dp = new Array(nums.length).fill(1)

  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max(...dp)
};

// 贪心 + 二分
var lengthOfLIS = function(nums) {
  const n = nums.length

  if (n < 2) return n

  const dp = new Array(n + 1).fill(0)
  let len = 1
  dp[len] = nums[0]

  for (let i = 1; i < n; i++) {
    if (nums[i] > dp[len]) {
      // 如果比dp最后一位还大，就直接放入末尾
      dp[++len] = nums[i]
    } else {
      // 否则，将nums[i]放入dp中，替换掉（第一个）比它大的值
      // 这么做是为了保证dp[len]一定是最小的
      // dp数组不一定是最终结果，但是最后一位一定是对的！！！
      let l = 1, r = len, pos = 0
      while (l <= r) {
        const mid = (l + r) >> 1
        if (dp[mid] < nums[i]) {
          pos = mid
          l = mid + 1
        } else {
          r = mid - 1
        }
      }
      dp[pos + 1] = nums[i]
    }
  }

  return len
};