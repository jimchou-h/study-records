/**
 * 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
 * k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 * 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 */

var reverseKGroup = function (head, k) {
  if (!head || (k === 1)) return head

  // 反转链表
  const reverse = (first, final) => {
      let pre = null, cur = first, temp = null

      while (cur) {

          if (cur === final) break

          temp = cur.next
          cur.next = pre
          pre = cur
          cur = temp
      }

      return [pre, first]
  }

  // 设置一个最顶部的节点，用于处理边界情况及返回
  let hair = new ListNode(0)
  hair.next = head

  // 定义一个变量保存一开始的hair节点或者上一次循环最后的节点
  let first = hair

  while (head) {

      let tail = first

      // 判断链表里有没有到k的节点
      for (let i = 0; i < k; i++) {
          tail = tail.next
          if (!tail) return hair.next
      }

      // 置为null反转链表不用再判断
      let temp = tail.next
      tail.next = null

      const result = reverse(head)

      // 重新拼接链表
      first.next = result[0]
      result[1].next = temp
      first = result[1]
      head = first.next
  }

  return hair.next
};
