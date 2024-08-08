/**
 * https://leetcode.cn/problems/reverse-nodes-in-k-group/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverse = (head, end) => {
  let pre = null, cur = head
  while (cur !== end) {
    const next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}
var reverseKGroup = function (head, k) {
  const pre = new ListNode(0, head)
  let cur = pre
  while (true) {
    let count = k, last = cur, newTail = cur.next
    while (count > 0) {
      cur = cur.next
      if (!cur) {
        return pre.next
      }
      --count
    }
    const next = cur.next
    last.next = reverse(newTail, cur.next)
    newTail.next = next
    cur = newTail
  }
};