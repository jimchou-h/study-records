/**
 * https://leetcode.cn/problems/merge-two-sorted-lists/?envType=study-plan-v2&envId=top-100-liked
 */

// 迭代
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
  let pre = new ListNode(0), cur = pre
  while (list1 || list2) {
    if (!list1) {
      cur.next = list2
      list2 = list2.next
    } else if (!list2) {
      cur.next = list1
      list1 = list1.next
    } else {
      if (list1.val < list2.val) {
        cur.next = list1
        list1 = list1.next
      } else {
        cur.next = list2
        list2 = list2.next
      }
    }
    cur = cur.next
  }
  return pre.next
};

// 递归
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
  if (!list1 || !list2) {
    return list1 || list2
  }
  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2)
    return list1
  } else {
    list2.next = mergeTwoLists(list1, list2.next)
    return list2
  }
};