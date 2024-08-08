/**
 * https://leetcode.cn/problems/reverse-linked-list/description/?envType=study-plan-v2&envId=top-100-liked
 */

// 迭代
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  // pre记录上个节点
  // cur记录当前节点
  // temp记录原来cur的下个节点
  let pre = null, cur = head, temp = null

  while (cur) {
    temp = cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }

  return pre
}