// 第一题
// async function async1() {
//   console.log('async1 start');
//   /** 
//    * 1. await 关键字会暂停 async1 函数的执行，直到 async2 函数返回的 Promise 被解决（resolved）。
//    * async2 函数被调用，console.log('async2') 被执行，输出 async2。
//    * async2 函数执行完毕后，返回一个立即解决的 Promise，await 会等待这个 Promise 解决。
//    * 2. 继续执行 async1 函数：
//    * 由于 await 会暂停 async1 的执行，async1 函数会暂时挂起，控制权返回给调用者（即全局作用域）。
//    * 此时，async1 函数的剩余部分（即 console.log('async1 end')）会被放入微任务队列（microtask queue）中，等待当前同步代码执行完毕后执行。
//   */
//   await async2();
//   console.log('async1 end');
// }
// async function async2() {
//   console.log('async2');
// }
// async1();
// console.log('script end');
// console.log("5" + 2); // 隐式转换

// 输出的结果顺序如下：
// async1 start
// async2
// script end
// async1 end

// 关键点总结
// async/await 是基于 Promise 的语法糖，await 会暂停当前 async 函数的执行，直到等待的 Promise 被解决。
// await 之后的代码会被放入微任务队列中，等待当前同步代码执行完毕后执行。
// 事件循环会先执行所有同步代码，然后再处理微任务队列中的任务。


// 第二题
// async function async1() {
//   await async2();
//   console.log("async1 end"); // await之后的代码，作为微任务放入任务队列。
// }

// async function async2() {
//   console.log('async2 end');
// }

// async1();

// setTimeout(function () { // 异步代码，回调函数作为宏任务被放入任务队列。
//   console.log('setTimeout');
// }, 0);

// new Promise(resolve => {
//   console.log('Promise'); // 同步代码，立即执行。
//   resolve();
// })
//   .then(function () {
//     console.log('promise1'); // 放入微任务队列
//   })
//   .then(function () {
//     console.log('promise2'); // 放入微任务队列
//   });

// 输出结果：
// 'async2 end'
// 'Promise'
// "async1 end"
// 'promise1'
// 'promise2'
// 'setTimeout'

// 第三题
console.log('script start');

async function async1() {
  await async2();
  console.log('async1 end');
  // 放入微任务 1，await之后的任务都会放入微任务中，不管你是不是同步代码。
}

async function async2() {
  console.log('async2 end');
}

async1();

setTimeout(function () {
  console.log('setTimeout');
}, 0)

new Promise(resolve => {
  console.log('Promise');
  resolve();
})
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  })

console.log('script end');

// 输出结果：
// 'script start'
// 'async2 end'
// 'Promise'
// 'script end'
// 'async1 end'
// 'promise1'
// 'promise2'
// 'setTimeout'
