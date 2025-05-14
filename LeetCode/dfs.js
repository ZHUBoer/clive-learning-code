class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

/**
 * @param {TreeNode} root
 * @return {Array}
*/
// 广度优先遍历
const BFS = (root) => {
  if (!root) return [];
  const res = [],
    queue = [];
  queue.push(root);
  while (queue.length !== 0) {
    let curSize = queue.length;
    for (let i = 0; i < curSize; i++) {
      let node = queue.shift();
      res.push(node);
      // 左节点先push,从左到右的遍历顺序
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return res;
};

/**
 * @param {TreeNode} root
 * @return {Array}
*/
// 深度遍历(先序)
const DFS = (root) => {
  if (!root) return [];
  const res = [];
  const stack = [root];

  while (stack.length !== 0) {
    const node = stack.pop();
    // 前序遍历顺序：根节点 → 左子树 → 右子树
    res.push(node);
    // 右子节点先入栈（保证左子节点先出栈）
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }

  return res;
};

// 测试用例
function test() {
  // 构建测试树：
  //        1
  //      /   \
  //     2     3
  //    / \
  //   4   5
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);

  const dfsResult = DFS(root);
  const bfsResult = BFS(root);
  const dfsValues = dfsResult.map(node => node.val); // 提取节点值
  const bfsValues = bfsResult.map(node => node.val); // 提取节点值
  console.log('DFS遍历结果:', dfsValues); // 应该输出 [1, 2, 4, 5, 3]
  console.log('BFS遍历结果:', bfsValues); // 应该输出 [1, 2, 3, 4, 5]
}

// 运行测试
test();
// DFS遍历结果: [ 1, 2, 4, 5, 3 ]
// BFS遍历结果: [ 1, 2, 3, 4, 5 ]