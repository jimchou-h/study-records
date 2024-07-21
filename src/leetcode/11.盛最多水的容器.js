/**
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 返回容器可以储存的最大水量。
 */

var maxArea = function (height) {
  // 用双指针的原因是因为区域是x轴往里缩的
  // 要想面积变大 y轴侧小的值肯定不再适合继续做边
  // 所以可以舍弃掉
  let l = 0;
  r = height.length - 1;
  let maxArea = 0;
  while (l < r) {
    let area = Math.min(height[l], height[r]) * (r - l);
    maxArea = Math.max(maxArea, area);
    if (height[l] < height[r]) {
      l++;
    } else {
      r--;
    }
  }
  return maxArea;
};
