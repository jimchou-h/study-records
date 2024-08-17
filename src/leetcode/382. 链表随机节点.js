/**
 * https://leetcode.cn/problems/linked-list-random-node/description/
 */

// 常规方法
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

// 水塘抽样（记录一下...）
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
