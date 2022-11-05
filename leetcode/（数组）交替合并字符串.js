/**
 * 给你两个字符串 word1 和 word2 。请你从 word1 开始，通过交替添加字母来合并字符串。如果一个字符串比另一个字符串长，就将多出来的  * 字母追加到合并后字符串的末尾。
 */

var mergeAlternately = function(word1, word2) {
	let result = ''

	const word1arr = word1.split(''),
		word2arr = word2.split('')
	while (word1arr.length && word2arr.length) {
		result += word1arr.shift() + word2arr.shift()
	}
	result += word1arr.join('') + word2arr.join('')
	return result
};
