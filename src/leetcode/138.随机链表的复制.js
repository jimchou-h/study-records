/**
 * https://leetcode.cn/problems/copy-list-with-random-pointer/?envType=study-plan-v2&envId=top-100-liked
 */

// 递归
/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function(head, pre = new _Node(0), weakMap = new WeakMap()) {
  if (!head) return null
  pre.next = new _Node(head.val)
  weakMap.set(head, pre.next)
  copyRandomList(head.next, pre.next, weakMap)
  pre.next.random = weakMap.get(head.random)
  return pre.next
};

// 哈希表 + 双重遍历
/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function(head) {
  const weakMap = new WeakMap()
  let pre = new _Node(0, null, null), cur = pre, oldCur = head
  while (oldCur) {
    cur.next = new _Node(oldCur.val, null, null)
    weakMap.set(oldCur, cur.next)
    cur = cur.next
    oldCur = oldCur.next
  }
  cur = pre
  while (head) {
    head.random && (cur.next.random = weakMap.get(head.random))
    head = head.next
    cur = cur.next
  }
  return pre.next
};