/**
 * https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 递归
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var recursion = function(pre, cur, n) {
  if (!cur) {
    return 0
  }
  const count = recursion(cur, cur.next, n) + 1
  if (count === n) {
    pre.next = cur.next
  }
  return count
}
var removeNthFromEnd = function(head, n) {
  if (!head.next && n === 1) {
    return null
  }
  const pre = new ListNode(0, head)
  recursion(pre, head, n)
  return pre.next
};

// 双指针
// 快慢指针间距为n - 1
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  if (!head.next && n === 1) {
    return null
  }
  const pre = new ListNode(0, head)
  let fast = pre, slow = pre
  while (n > 0) {
    fast = fast.next
    n--
  }
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return pre.next
};

// 两次遍历
// 第一次获取长度即可