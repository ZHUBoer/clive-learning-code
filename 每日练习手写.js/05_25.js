// 使用Proxy实现 访问array[-1]
let array = [1, 2, 3];

array = new Proxy(array, {
  get(target, prop, receiver) {
    if (prop < 0) {
      // 即使我们像 arr[1] 这样访问它
      // prop 是一个字符串，所以我们需要将其转换成数字
      prop = +prop + target.length; // 隐式转换 使用符号将其转为数值
    }
    return Reflect.get(target, prop, receiver);
  },
});

console.log(array[-1]); // 3
console.log(array[-2]); // 2


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