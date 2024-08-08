/**
 * https://leetcode.cn/problems/palindrome-linked-list/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 数组 + 双指针
var isPalindrome = function(head) {
  const arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }

  let left = 0, right = arr.length - 1
  while (left < right) {
    if (arr[left] !== arr[right]) {
      return false
    }
    ++left
    --right
  }
  return true
};

// 递归（空间复杂度O(1)）
let p1 = null
var recursion = function (node) {
  if (node.next) {
    if (!recursion(node.next)) {
      return false
    }
  }
  if (node.val === p1.val) {
    p1 = p1.next
  } else {
    return false
  }
  return true
}
var isPalindrome = function(head) {
  p1 = head
  return recursion(head)
}

// 反转一半链表比较