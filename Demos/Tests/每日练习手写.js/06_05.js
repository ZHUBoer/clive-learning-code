// 层次遍历
// 先创建一棵树
var root = {
  val: 3,
  left: {
    val: 20,
    left: {
      val: 15,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
  right: {
    val: 9,
    left: null,
    right: null,
  },
};
console.log(root);

// 按层输出
const levelOrder = (root) => {
  if (!root) {
    return [];
  }
  const res = [],
    queue = [];
  queue.push(root);
  while (queue.length !== 0) {
    let curLevelSize = queue.length;
    res.push([]);
    for (let index = 1; index <= curLevelSize; index++) {
      let node = queue.shift();
      res[res.length - 1].push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return res;
};
console.log(levelOrder(root));
