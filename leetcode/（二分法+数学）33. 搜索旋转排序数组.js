/**
 * 整数数组 nums 按升序排列，数组中的值 互不相同
 * 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2]
 * 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1
 * 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题
 */


var search = function(nums, target) {
  if (nums.length === 0) return -1
  let l = 0,
    r = nums.length - 1
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2)
    if (nums[mid] === target) {
      return mid
    }
    // 如果符合nums[0] <= nums[mid]的话说明左边肯定是个单调递增数组
    // 如果符合nums[0] > nums[mid]的话说明右边肯定是个单调递增数组
    // 这样就可以根据区间单调性判断target是否在区间内
    if (nums[0] <= nums[mid]) {
      if (nums[0] <= target && target < nums[mid]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[nums.length - 1]) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
  return -1
};
