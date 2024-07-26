/**
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const len = s.length
  if (len <= 1) {
    return len
  }
  let result = 0
  let fast = 0, slow = 0

  // map key存储字符，value存储字符下标
  const positionMap = new Map()

  while (fast < len) {

    // fast指针走到直到有重复字符的位置
    while (s[fast] && !positionMap.has(s[fast])) {
      positionMap.set(s[fast], fast)
      fast++
    }

    // 计算无重复字符的长度
    result = Math.max(result, fast - slow)
    
    // 更新slow位置并删除中间的map 字符
    const slowNext = positionMap.get(s[fast]) + 1
    while (slow < slowNext) {
      positionMap.delete(s[slow])
      slow++
    }
  }
  return result
};