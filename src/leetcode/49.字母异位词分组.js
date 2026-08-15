/**
 * https://leetcode.cn/problems/group-anagrams/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：排序 + 哈希表，哈希表的 key 可以用排序后的字符串或者字母的 charCodeAt 计算的总和
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map();
  for (let str of strs) {
    let sortStr = str.split("").sort().join("");
    map.set(sortStr, [...(map.get(sortStr) || []), str]);
  }
  // Iterator转化为数组返回
  return Array.from(map.values());
};
