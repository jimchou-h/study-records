/**
 * https://leetcode.cn/problems/add-two-numbers/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 迭代
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let pre = new ListNode(0), cur = pre, needPlus = false
  while (l1 && l2) {
    const val = l1.val + l2.val + (needPlus ? 1 : 0)
    needPlus = val >= 10 ? true : false
    cur.next = new ListNode(val % 10)
    cur = cur.next
    l1 = l1.next
    l2 = l2.next
  }
  while (l1) {
    const val = l1.val + (needPlus ? 1 : 0)
    needPlus = val >= 10 ? true : false
    cur.next = new ListNode(val % 10)
    cur = cur.next
    l1 = l1.next
  }
  while (l2) {
    const val = l2.val + (needPlus ? 1 : 0)
    needPlus = val >= 10 ? true : false
    cur.next = new ListNode(val % 10)
    cur = cur.next
    l2 = l2.next
  }
  if (needPlus) {
    cur.next = new ListNode(1)
  }
  return pre.next
};