// 深拷贝和浅拷贝都是针对数组和对象的
function cloneDeep(obj) {
  let cloneObj = Array.isArray(obj) ? [] : {}; // 判断是数组还是对象
  // 若不为null，且是数组或对象；空数组和空对象在条件判断时都是true。
  if (obj && typeof obj === "object") {
    // 对每个属性都遍历处理
    for (key in obj) { // 注意for...in遍历的是索引key
      if (obj.hasOwnProperty(key)) {
        if ((obj[key] && typeof obj[key]) === "object") {
          cloneObj[key] = cloneDeep(obj[key]);
        } else {
          cloneObj[key] = obj[key];
        }
      }
    }
  }
  return cloneObj;
}

// 深拷贝 栈的思想
function cloneDeep5(x) {
  const root = {};

  // 栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    }
  ];

  while (loopList.length) {
    // 广度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

// 深拷贝手写练习
const myDeepClone = (obj) => {
  const cloneObj = Array.isArray(obj) ? [] : {};

  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          cloneObj[key] = myDeepClone(obj[key])
        } else {
          cloneObj[key] = obj[key];
        }
      }
    }

    return cloneObj;
  }
};

let arr = [1, 2, , 3];
for (const ele of arr) {
  console.log(ele);
}

const obj = [1, 2, 3, [1, 2, [3, 2]]];
const cloneObj = myDeepClone(obj);
cloneObj[3][1] = 9;
console.log(obj, cloneObj); // [ 1, 2, 3, [ 1, 2, [ 3, 2 ] ] ] [ 1, 2, 3, [ 1, 9, [ 3, 2 ] ] ] 实现深拷贝
