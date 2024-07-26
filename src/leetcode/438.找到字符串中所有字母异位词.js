/**
 * https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
  const pLen = p.length, sLen = s.length
  if (sLen < pLen) {
    return []
  }

  // 使用这种方式存储，比较的时候可以直接通过toString方法比较
  const sCountArr = new Array(26).fill(0);
  const pCountArr = new Array(26).fill(0);
  for (let i = 0; i < pLen; i++) {
    ++sCountArr[s[i].charCodeAt() - 'a'.charCodeAt()];
    ++pCountArr[p[i].charCodeAt() - 'a'.charCodeAt()];
  }

  const result = []

  for (let i = 0; i < sLen - pLen + 1; i++) {
    // 滑动窗口，每次循环去掉前一位，增加下一位
    if (i > 0) {
      --sCountArr[s[i - 1].charCodeAt() - 'a'.charCodeAt()];
      ++sCountArr[s[i + pLen - 1].charCodeAt() - 'a'.charCodeAt()];
    }

    if (sCountArr.toString() === pCountArr.toString()) {
      result.push(i)
    }
  }
  return result
};