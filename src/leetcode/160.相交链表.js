/**
 * https://leetcode.cn/problems/intersection-of-two-linked-lists/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 哈希表
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  const headAWeakMap = new WeakMap()
  while (headA) {
    headAWeakMap.set(headA, 1)
    headA = headA.next
  }
  while (headB) {
    if (headAWeakMap.has(headB)) {
      return headB
    }
    headB = headB.next
  }
  return null
};

// 双指针（空间复杂度O(1)）
// 设相交点前A、B链表的长度分别为a、b，相交点后公共链表的长度为c
// 如果有相交，a === b，会通知到达相交点
// 如果有相交，a !== b，那么A指针走a + c + b步，B指针走b + c + a步，最终会相遇
// 如果没有相交，链表长度相同会同时为null
// 如果没有相交，链表长度不同，A指针走a + b步，B指针走b + a步，最终会同时为null
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  let pA = headA, pB = headB
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next
    pB = pB === null ? headA : pB.next
  }
  return pA
}