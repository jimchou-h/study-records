/**
 * https://leetcode.cn/problems/container-with-most-water/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：双指针，因为在 x 缩的情况下，短边肯定不会有更大的面积
 */

var maxArea = function (height) {
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
