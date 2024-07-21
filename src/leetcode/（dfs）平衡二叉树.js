/**
 * 给定一个二叉树，判断它是否是高度平衡的二叉树
 * 本题中，一棵高度平衡二叉树定义为：
 *   一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1
 */

var isBalanced = function(root) {
	if (!root) return true
	let leftDeep = getDeep(root.left)
	let rightDeep = getDeep(root.right)
	if (Math.abs(leftDeep - rightDeep) > 1) return false
	return isBalanced(root.left) && isBalanced(root.right)
};

var getDeep = function(root) {
	if (!root) return 0
	return Math.max(getDeep(root.left), getDeep(root.right)) + 1
}
