/**
 * 给定一个包含大写字母和小写字母的字符串 s ，返回 通过这些字母构造成的 最长的回文串 。
 * 在构造过程中，请注意 区分大小写 。比如 "Aa" 不能当做一个回文字符串。
 */

// 思路：只要两两一对，就能形成回文串，如果最后有多余的值，可以再取一个作为中心值

var longestPalindrome = function(s) {
	const map = new Map()
	let twoPairs = 0
	for (let i = 0, len = s.length; i < len; i++) {
		let val = map.get(s[i])
		if (val === 1) {
			twoPairs++
			map.set(s[i], 0)
		} else {
			map.set(s[i], 1)
		}
	}
	return (twoPairs * 2 + 1) > s.length ? (twoPairs * 2) : (twoPairs * 2 + 1)
};
