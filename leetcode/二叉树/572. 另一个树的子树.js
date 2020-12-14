// 给定两个非空二叉树 s 和 t，检验 s 中是否包含和 t 具有相同结构和节点值的子树。
// s 的一个子树包括 s 的一个节点和这个节点的所有子孙。s 也可以看做它自身的一棵子树。
// leetcode 96ms 38.7MB
// isSubtree方法递归遍历节点
var isSubtree = function(s, t) {
  if (!s) {
    return false;
  }
  if (s.val === t.val) {
    if (compare(s, t)) {
      return true
    }
  }
  return isSubtree(s.left, t) || isSubtree(s.right, t)
};
// compare方法判断当前节点的子树和t是否相同
// 递归比较
var compare = function(s, t) {
  if (!s && !t) {
    return true;
  }
  if ((!s || !t) || s.val !== t.val) {
    return false;
  }
  return compare(s.left, t.left) && compare(s.right, t.right)
}
