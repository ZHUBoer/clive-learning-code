/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? null : left)
 *   this.right = (right===undefined ? null : right)
 * }
 */

/**
 * 给你两棵二叉树 root 和 subRoot 。检验 root 中是否包含和 subRoot 具有相同结构和节点值的子树。如果存在，返回 true ；否则，返回 false 。
 * 二叉树 tree 的一棵子树包括 tree 的某个节点和这个节点的所有后代节点。tree 也可以看做它自身的一棵子树。
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */

// 判断是否是子树
var isSubtree = function (A, B) {
  if (!A || !B) {
    return false;
  }
  return (
    isSame(A, B) || isSubtree(A.left, B) || isSubtree(A.right, B)
  );
};

const isSame = (m, n) => {
  if (!n) {
    return true;
  }
  if (!m) {
    return false;
  }
  return m.val == n.val && isSame(m.left, n.left) && isSame(m.right, n.right);
};
