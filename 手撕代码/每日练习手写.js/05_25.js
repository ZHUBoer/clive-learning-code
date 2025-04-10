// 使用Proxy实现访问array[-1]
let array = [1, 2, 3];

array = new Proxy(array, {
  get(target, prop, receiver) {
    // 将属性转换为字符串处理
    const strProp = String(prop);

    // 尝试转换为数字并验证是否为整数
    const numericProp = Number(strProp);
    if (Number.isInteger(numericProp)) {
      // 处理负数索引
      if (numericProp < 0) {
        prop = numericProp + target.length;
      }
      // 验证转换后的索引有效性
      if (prop >= 0 && prop < target.length) {
        return Reflect.get(target, prop, receiver);
      }
    }

    // 非数字属性或无效索引直接返回原始属性
    return Reflect.get(target, prop, receiver);
  }
});

console.log(array[-1]); // 3
console.log(array[-2]); // 2
console.log(array.length); // 3（正常访问length属性）
console.log(array[1.5]); // undefined（保持原生数组行为）


// ajax控制并发请求的数量
function creatRequest(tasks, pool) {
  // 每次控制的发送请求的数量pool
  pool = pool || 5;
  // 用于存储每一次请求的结果(按顺序进行存贮)
  let results = [],
    // together 用于创建工作区，当pool传入的是几，我们就对应的创建几个工作区
    // 也就是创建一个长度为pool且值为null的一个数组
    together = new Array(pool).fill(null),
    // index为每次获取的任务值
    index = 0;
  together = together.map(() => {
    // 基于Promise进行管理
    return new Promise((resolve, reject) => {
      // 创建一个函数，进来立刻执行
      const run = function run() {
        // 如果任务池已经空了，说明请求发送完成了，直接成功
        if (index >= tasks.length) {
          resolve();
          return;
        }
        // 先将index保存一下用于存储当前成功请求的结果
        let old_index = index,
          // 获取当前发送的请求，然后把index进行累加，所以上面会把index保存起来
          // 这里index++ 是先运算后累加的，而++index则相反，先累加后运算
          task = tasks[index++];
        // 执行请求
        task()
          .then((result) => {
            // 将成功结果保存
            results[old_index] = result;
            // 递归继续执行，也就是继续拿到任务到工作区执行
            run();
          })
          .catch((reason) => {
            reject(reason);
          });
      };
      // 立即执行
      run();
    });
  });
  // 用Promise.all管控工作区，也就是每次并发两个请求
  return Promise.all(together).then(() => results);
}

creatRequest(tasks, 2)
  .then((results) => {
    // 都成功，整体才成功，按顺序存储结果
    console.log("成功", results);
  })
  .catch((resolve) => {
    // 只要有一个失败，整体失败
    console.log("失败");
  });