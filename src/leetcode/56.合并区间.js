/**
 * https://leetcode.cn/problems/merge-intervals/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 排序
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  const len = intervals.length;
  if (len === 1) {
    return intervals;
  }
  const result = [];
  intervals.sort((a, b) => a[0] - b[0]);
  // min和max用来存储上个区间的最大最小值，用来比较
  let min = intervals[0][0],
    max = intervals[0][1];
  for (let i = 1; i < len; i++) {
    if (intervals[i][0] > max) {
      // 如果当前区间的最小值大于max，说明没有交集，直接push
      result.push([min, max]);
      min = intervals[i][0];
      max = intervals[i][1];
    } else if (intervals[i][0] <= max && intervals[i][1] >= max) {
      // 如果当前区间的最小值小于等于max，说明有交集，更新max
      max = intervals[i][1];
    }
  }
  // 最后再把最新的一次push上去
  result.push([min, max]);
  return result;
};

// 简便的写法
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  const res = [];

  for (let item of intervals) {
    // 如果res为空，或者当前区间的最小值大于res中最后一个区间的最大值，说明没有交集，直接push
    if (!res.length || res[res.length - 1][1] < item[0]) {
      res.push(item);
    } else {
      // 如果当前区间的最小值小于等于res中最后一个区间的最大值，说明有交集，更新最大值
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], item[1]);
    }
  }

  return res;
};
