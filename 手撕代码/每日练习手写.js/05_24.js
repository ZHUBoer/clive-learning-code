// Proxy代理
// 使用set捕捉器进行验证
// let numbers = [];

// numbers = new Proxy(numbers, { // (*)
//   set(target, prop, val) { // 拦截写入属性操作
//     if (typeof val == 'number') {
//       target[prop] = val;
//       return true;
//     } else {
//       return false;
//     }
//   }
// });

// numbers.push(1); // 添加成功
// numbers.push(2); // 添加成功
// console.log("Length is: " + numbers.length); // 2

// numbers.push("test"); // TypeError（proxy 的 'set' 返回 false）
// 牛逼！

// 使用带有get捕捉器的默认值
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // 默认值
    }
  },
});

console.log(numbers[1]); // 1
console.log(numbers[123]); // 0（没有这个数组项）




