/**
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
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