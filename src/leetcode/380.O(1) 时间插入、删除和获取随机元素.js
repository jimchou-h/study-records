/**
 * https://leetcode.cn/problems/insert-delete-getrandom-o1/?envType=study-plan-v2&envId=top-interview-150
 */

// 哈希表 + 变长数组
// 如果单纯使用哈希表，获取 key 列表的时间复杂度是O(N)
// 如果单纯使用变长数组，判断元素是否存在的时间复杂度是O(N)
var RandomizedSet = function() {
  this.map = new Map()
  this.array = []
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
  if (this.map.has(val)) {
    return false
  } else {
    this.array.push(val)
    this.map.set(val, this.array.length - 1)
    return true
  }
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
  // 有值的话就把这一位在变长数组里的位置记录下来，然后和最后一位交换，最后删除最后一位
  if (this.map.has(val)) {
    const index = this.map.get(val)
    const last = this.array.length - 1
    this.array[index] = this.array[last]
    this.map.set(this.array[last], index)
    --this.array.length
  }
  return this.map.delete(val)
}

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
  return this.array[Math.floor(this.array.length * Math.random())]
};