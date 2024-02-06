/**
 * 给你一个字符串 s，最多 可以从中删除一个字符。
 * 请你判断 s 是否能成为回文字符串：如果能，返回 true ；否则，返回 false 。
 */

var validPalindrome = function(s, isSub = false) {
	let left = 0,
		right = s.length - 1
	while (left < right) {
		if (s[left] === s[right]) {
			left++
			right--
		} else {
			if (isSub) return false
			return validPalindrome(s.slice(left, right), true) || validPalindrome(s.slice(left + 1, right + 1),
				true)
		}
	}
	return true
};
