/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度
 */

// 滑动窗口
var lengthOfLongestSubstring = function(s) {
  const set = new Set()
  let max = 0
  // 右指针走到底的话肯定就没有更长的字串了
  for (let i = 0, j = 0, len = s.length; j < len; i++) {
    if (i > 0) set.delete(s[i - 1])
    // 如果i和j之间的字符串不重复的话j指针可以一直往右走
    // 不然就i指针一直往左走，直到i和j之间的字符串不重复
    while (j < len && !set.has(s[j])) {
      set.add(s[j])
      j++
    }
    max = Math.max(max, j - i)
  }
  return max
};
