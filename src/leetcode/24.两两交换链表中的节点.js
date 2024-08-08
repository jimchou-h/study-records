/**
 * https://leetcode.cn/problems/swap-nodes-in-pairs/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 迭代
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  const pre = new ListNode(0, head)
  let point = pre
  while (point.next && point.next.next) {
    const head = point.next
    const newHead = point.next.next
    const nextLintNode = newHead.next
    newHead.next = head
    head.next = nextLintNode
    point.next = newHead
    point = point.next.next
  }
  return pre.next
};

// 递归
var swapPairs = function(head) {
  if (!head || head.next === null) {
    return head
  }
  const newHead = head.next
  head.next = swapPairs(newHead.next)
  newHead.next = head
  return newHead
};