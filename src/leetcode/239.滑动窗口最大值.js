/**
 * https://leetcode.cn/problems/sliding-window-maximum/?envType=study-plan-v2&envId=top-100-liked
 */

// 单调对接
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const result = [];
  const deque = []; // 双端队列，存储数组下标

  for (let i = 0; i < nums.length; i++) {
    // 删除队列中小于当前元素的值，因为它们不可能成为滑动窗口的最大值
    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // 判断队列头部的元素是否已经超出滑动窗口的范围
    if (deque[0] <= i - k) {
      deque.shift();
    }

    // 当窗口长度为k时，记录当前窗口的最大值
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
};

// 堆
// 用堆暴露出最大值，然后用数组维护最新位置，每次遍历时先把不在窗口里的最大值删除