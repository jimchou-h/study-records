// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
// leetcode 64ms 34.8MB
var twoSum = function(nums, target) {
  let arr = [];
  for (let i = 0, len = nums.length; i < len; i++) {
    if (typeof arr[nums[i]] !== 'number') {
      arr[target - nums[i]] = i;
    } else {
      return [arr[nums[i]], i]
    }
  }
};
