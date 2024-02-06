/**
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 *
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 */

// 哈希表
var majorityElement = function (nums) {
  const map = new Map();
  for (let i = 0, len = nums.length; i < len; i++) {
    let count = map.get(nums[i]) || 0;
    map.set(nums[i], ++count);
  }
  let maxNum = 0,
    result = 0;
  for (let i of map.keys()) {
    const count = map.get(i);
    if (count > maxNum) {
      result = i;
      maxNum = count;
    }
  }
  return result;
};

// 数学，排序后 n/2 位必定是该数字
var majorityElement = function (nums) {
  nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
};
