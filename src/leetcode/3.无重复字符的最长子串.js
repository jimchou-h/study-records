/**
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：双指针，哈希表存储字符和下标，如果遇到重复字符，则更新左指针到窗口内最左边重复字符的下一个位置，并在哈希表里清除移动中遇到的所有字符
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let result = 0;

  let i = 0,
    j = 0;
  const hasMap = {};

  while (j < s.length) {
    if (typeof hasMap[s[j]] === "number") {
      result = Math.max(result, j - i);
      while (i < hasMap[s[j]] + 1) {
        hasMap[s[i]] = undefined;
        i++;
      }
      hasMap[s[j]] = j;
    } else {
      hasMap[s[j]] = j;
    }
    j++;
  }

  result = Math.max(result, j - i);

  return result;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const len = s.length;
  if (len <= 1) {
    return len;
  }
  let result = 0;
  let fast = 0,
    slow = 0;

  // map key存储字符，value存储字符下标
  const positionMap = new Map();

  while (fast < len) {
    // fast指针走到直到有重复字符的位置
    while (s[fast] && !positionMap.has(s[fast])) {
      positionMap.set(s[fast], fast);
      fast++;
    }

    // 计算无重复字符的长度
    result = Math.max(result, fast - slow);

    // 更新slow位置并删除中间的map 字符
    const slowNext = positionMap.get(s[fast]) + 1;
    while (slow < slowNext) {
      positionMap.delete(s[slow]);
      slow++;
    }
  }
  return result;
};
