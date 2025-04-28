const root = {
  val: 15,
  left: {
    val: 7,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: {
      val: 9,
      left: null,
      right: null,
    },
  },
  right: {
    val: 20,
    left: null,
    right: null,
  },
};
console.log('树结构如下');
console.log(root);

// TODO: BFS 广度优先遍历

// 逐个输出
const levelOrder = function (root) {
  // 层次遍历
  // 设置tmp数组记录每一层的节点, 设置队列queue
  if (!root) return [];
  let res = [],
    queue = [];
  queue.push(root);
  while (queue.length != 0) {
    let tmp = [];
    for (item in queue) {
      node = queue.shift();
      tmp.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(tmp);
  }
  return res.flat(2);
};
// console.log('层次遍历｜一次输出');
// console.log(levelOrder(root));

// 按层输出
const levelOrder1 = function (root) {
  const res = [];
  if (!root) {
    return [];
  }
  const queue = [];
  queue.push(root);
  while (queue.length !== 0) {
    let curLevelSize = queue.length;
    res.push([]); // 创建每一层的空数组，用来存放这一层的节点
    for (let i = 1; i <= curLevelSize; i++) {
      let node = queue.shift();
      res[res.length - 1].push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return res;
};
// console.log('层次遍历｜逐层输出');
// console.log(levelOrder1(root));

// TODO: DFS 深度优先遍历
// 不撞南墙不回头
const dfs = (node, list) => {
  if (node) {
    list.push(node.val);
    dfs(node.left, list);
    dfs(node.right, list);
  }
  return list;
};
// console.log('深度优先遍历');
// console.log(dfs(root, []));

// TODO: 二叉排序树查找数值
const BST_search = (node, target) => {
  if (node) {
    if (node.val == target) {
      return true;
    } else if (node.val < target) {
      BST_search(node.right, target);
    } else {
      BST_search(node.left, target);
    }
  }
  return false;
};
let target = 15;
// console.log('二叉排序树搜索数值：',target);
// console.log(BST_search(root, target));

// 广度优先遍历 | 二叉树的右视图
const rightSideView = (root) => {
  if (!root) {
    return [];
  }
  const res = [], // 结果数组
    queue = []; // 每一层的队列
  queue.push(root);
  while (queue.length > 0) {
    const tmp = []; // 存放每一层节点的值
    let curLength = queue.length;
    for (let i = 0; i < curLength; i++) {
      let node = queue.shift();
      tmp.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(tmp[tmp.length - 1]);
  }
  return res;
};

// console.log('二叉树的右视图：', rightSideView(root));

// 路径之和 || 
const pathSum = (root, targetSum) => {

};

console.log(pathSum(root, 35));