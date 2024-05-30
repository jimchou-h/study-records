/**
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 */

// 快排 + 遍历（O(nlogn)）
var longestConsecutive = function (nums) {
  const len = nums.length;

  if (len < 2) return len;

  nums = Array.from(new Set(nums.sort((a, b) => a - b)));

  let count = 1,
    result = 0;
  for (let i = 1; i < len; i++) {
    if (nums[i] - nums[i - 1] !== 1) {
      result = Math.max(result, count);
      count = 1;
    } else {
      ++count;
    }
  }

  result = Math.max(result, count);

  return result;
};

// 哈希表（O(n)）
var longestConsecutive = function (nums) {
  let num_set = new Set();
  nums.forEach((num) => {
    num_set.add(num);
  });

  let result = 0;

  for (let num of num_set) {
    // 判断当前值没有上一个值的话开始计算长度
    if (!num_set.has(num - 1)) {
      let currentNum = num;
      let long = 1;

      while (num_set.has(currentNum + 1)) {
        ++currentNum;
        ++long;
      }

      result = Math.max(long, result);
    }
  }

  return result;
};
