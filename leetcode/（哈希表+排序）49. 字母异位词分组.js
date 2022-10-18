/**
 * 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串
 */

var groupAnagrams = function(strs) {
  let position = 0
  // sort数组key值保存排序后的字母，value值保存index值
  // 用map数组更方便一些
  const sort = [], result = []
  for (let i = 0, len = strs.length; i < len; i++) {
    let cur = strs[i].split('').sort().join('')
    let index = sort[cur]
    if (index > -1) {
      result[index].push(strs[i])
    } else {
      sort[cur] = position
      result[position] = [strs[i]]
      position++
    }
  }
  return result
}

// 2022
var groupAnagrams = function(strs) {
  // key 排序后的字符串
  // index 数组在result对应的index
  const map = new Map()
  const result = []
  for (let i = 0, len = strs.length; i < len; i++) {
    const strSort = strs[i].split('')
                           .sort()
                           .join('')
    const key = map.get(strSort)
    if (key || key === 0) {
      result[key].push(strs[i])
    } else {
      result.push([strs[i]])
      map.set(strSort, result.length - 1)
    }
  }
  return result
};