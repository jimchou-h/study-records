// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 注意：给定 n 是一个正整数。
// leetcode 48ms 33.8MB
var climbStairs = function(n) {
  if (n < 4) {
    return n;
  }
  // 使用数组存储的话会性能会更好,也可以用递归·
  let stair = [, 1, 2];
  for (let i = 3; i < n; i++) {
    stair[i] = stair[i - 1] + stair[i - 2];
  }
  return stair[n - 1] + stair[n - 2];
};
