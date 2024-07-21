/**
 * https://leetcode.cn/problems/group-anagrams/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const map = new Map()
  for (let str of strs) {
    let sortStr = str.split("").sort().join("")
    map.set(sortStr, [...(map.get(sortStr) || []), str])
  }
  // Iterator转化为数组返回
  return Array.from(map.values())
};