/**
 * dfs
 */

// 前序遍历
var preorderTraversal = function(root, result = []) {
	if (!root) return []
	result.push(root.val)
	root.left && preorderTraversal(root.left, result)
	root.right && preorderTraversal(root.right, result)
	return result
};

// 中序遍历
var preorderTraversal = function(root, result = []) {
	if (!root) return []
	root.left && preorderTraversal(root.left, result)
	result.push(root.val)
	root.right && preorderTraversal(root.right, result)
	return result
};

// 后序遍历
var preorderTraversal = function(root, result = []) {
	if (!root) return []
	root.left && preorderTraversal(root.left, result)
	root.right && preorderTraversal(root.right, result)
	result.push(root.val)
	return result
};

/**
 * bfs
 */

// 前序遍历
var postorderTraversal = function(root, result = []) {
	const stack = []
	let node = root,
		prev = null
	while (node || stack.length) {
		while (node) {
			result.push(node.val)
			stack.push(node)
			node = node.left
		}
		node = stack.pop()
		if (node.right === null || node.right === prev) {
			prev = node
			node = null
		} else {
			stack.push(node)
			node = node.right
		}
	}
	return result
};

// 中序遍历
var postorderTraversal = function(root, result = []) {
	const stack = []
	let node = root,
		prev = null
	while (node || stack.length) {
		while (node) {
			stack.push(node)
			node = node.left
		}
		node = stack.pop()
		result.push(node.val)
		if (node.right === null || node.right === prev) {
			prev = node
			node = null
		} else {
			node = node.right
		}
	}
	return result
};

// 后序遍历
var postorderTraversal = function(root, result = []) {
	const stack = []
	let node = root,
		prev = null
	while (node || stack.length) {
		while (node) {
			stack.push(node)
			node = node.left
		}
		node = stack.pop()
		if (node.right === null || node.right === prev) {
			result.push(node.val)
			prev = node
			node = null
		} else {
			stack.push(node)
			node = node.right
		}
	}
	return result
};
