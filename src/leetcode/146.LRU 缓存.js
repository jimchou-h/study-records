/**
 * https://leetcode.cn/problems/lru-cache/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.keyToNodeHash = new Map();
  this.capacity = capacity || 1;

  // 记录链表头和尾
  this.startNode = null;
  this.endNode = null;

  // 记录节点数量
  this.nodeNum = 0;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.keyToNodeHash.has(key)) {
    const node = this.keyToNodeHash.get(key);
    this.moveToHead(node);
    return node.val;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (!this.keyToNodeHash.has(key)) {
    const newNode = new this._Node(value, key);
    this.keyToNodeHash.set(key, newNode);
    if (!this.endNode) {
      // 第一个节点
      this.endNode = this.startNode = newNode;
    } else {
      this.addToHead(newNode);
    }
    ++this.nodeNum;

    if (this.nodeNum > this.capacity) {
      this.keyToNodeHash.delete(this.endNode.key);
      const prevNode = this.endNode.prev;
      this.removeNode(this.endNode);
      this.endNode = prevNode;
      --this.nodeNum;
    }
  } else {
    const node = this.keyToNodeHash.get(key);
    node.val = value;
    this.moveToHead(node);
  }

  return null;
};

// 链表节点构造函数
LRUCache.prototype._Node = function (val, key, prev, next) {
  this.val = val;
  this.key = key;
  this.prev = prev;
  this.next = next;
};

// 节点添加到顶部
LRUCache.prototype.addToHead = function (node) {
  this.startNode.prev = node;
  node.next = this.startNode;
  this.startNode = node;
};

// 移除节点
LRUCache.prototype.removeNode = function (node) {
  if (node.prev) {
    node.prev.next = node.next;
    if (node.next) {
      node.next.prev = node.prev;
    }
  }
};

// 移到顶部
LRUCache.prototype.moveToHead = function (node) {
  // 已在顶部无需移动
  if (node === this.startNode) {
    return;
  }
  // 在底部 endNode 需要往前移动一位
  if (node === this.endNode) {
    this.endNode = this.endNode.prev || this.endNode;
  }
  this.removeNode(node);
  this.addToHead(node);
};
