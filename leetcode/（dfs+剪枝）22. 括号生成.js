/**
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 */

var generateParenthesis = function(n) {
	const result = []
	const dfs = (i, l, r, str) => {
		if (i === n * 2) {
			result.push(str)
			return
		}
		if (l < n) {
			dfs(i + 1, l + 1, r, str + '(')
		}
		// 如果str左括号比右括号少，就不能放
		if (l > r && r < n) {
			dfs(i + 1, l, r + 1, str + ')')
		}
	}
	dfs(1, 1, 0, '(')
	return result
};
