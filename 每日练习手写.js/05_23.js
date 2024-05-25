// 深拷贝

// 发布订阅

// 防抖

// 节流

// ajax实现请求的并发控制
// 1. 使用promise.all
const delay = function delay(interval) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(interval);
    }, interval);
  });
}; // 返回的时一个promise对象
let tasks = [
  () => {
    return delay(1000);
  },
  () => {
    return delay(1003);
  },
  () => {
    return delay(1005);
  },
  () => {
    return delay(1002);
  },
  () => {
    return delay(1004);
  },
  () => {
    return delay(1006);
  },
]; // 任务队列
Promise.all(tasks.map((task) => task())).then((res) => {
  console.log(res);
}); // [ 1000, 1003, 1005, 1002, 1004, 1006 ]


