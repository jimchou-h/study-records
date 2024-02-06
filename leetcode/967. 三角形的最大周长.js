/**
 * 给定由一些正数（代表长度）组成的数组 nums ，返回 由其中三个长度组成的、面积不为零的三角形的最大周长 。如果不能形成任何面积不为零的三角形，返回 0。
 */

// 思路：从最大的三条边开始求值，如果满足两边之和大于第三边的条件，既可以返回

var largestPerimeter = function(nums) {
	nums = nums.sort((a, b) => a - b)
	for (let i = nums.length - 3; i >= 0; i--) {
		if (nums[i] + nums[i + 1] > nums[i + 2]) {
			return nums[i] + nums[i + 1] + nums[i + 2]
		}
	}
	return 0
};
