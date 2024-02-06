/**
 * 给你一个单链表，随机选择链表的一个节点，并返回相应的节点值。每个节点 被选中的概率一样
 * 实现 Solution 类：
 *   Solution(ListNode head) 使用整数数组初始化对象
 *   int getRandom() 从链表中随机选择一个节点并返回该节点的值。链表中所有节点被选中的概率相等
 */

// 1.常规方法
/**
 * @param {ListNode} head
 */
var Solution = function(head) {
	this.listNodeList = []
	while (head) {
		this.listNodeList.push(head)
		head = head.next
	}
};

/**
 * @return {number}
 */
Solution.prototype.getRandom = function() {
	return this.listNodeList[Math.floor(Math.random() * this.listNodeList.length)].val
};

// 2.水塘抽样（记录一下...）
var Solution = function(head) {
	this.head = head;
};

Solution.prototype.getRandom = function() {
	let i = 1,
		ans = 0;
	for (let node = this.head; node != null; node = node.next) {
		if (Math.floor(Math.random() * i) === 0) { // 1/i 的概率选中（替换为答案）
			ans = node.val;
		}
		++i;
	}
	return ans;
};
