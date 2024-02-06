/**
 * 给定长度为 2n 的整数数组 nums ，你的任务是将这些数分成 n 对, 例如 (a1, b1), (a2, b2), ..., (an, bn) ，使得从 1 到 n 的 min(ai, bi) 总和最大。
 */

// 思路：我们得取a1舍弃b1，所以b1应该是相对a1来说数组最小的值，这就要通过排序来实现

var arrayPairSum = function(nums) {
	nums = nums.sort((a, b) => a - b)
	let result = 0
	for (let i = 0, len = nums.length; i < len; i += 2) {
		result += nums[i]
	}
	return result
};
