/**
 * https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/?envType=study-plan-v2&envId=top-100-liked
 */


/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  const len = nums.length
  if (len === 0) {
    return null
  } else if (len === 1) {
    return new TreeNode(nums[0])
  }
  const mid = Math.floor(len / 2)
  let head = new TreeNode(nums[mid])
  head.left = sortedArrayToBST(nums.slice(0, mid))
  head.right = sortedArrayToBST(nums.slice(mid + 1, len))
  return head
};