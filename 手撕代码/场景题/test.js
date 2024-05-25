// 判断是否是4的幂次
function isTrueFour(num) {
  let s = num.toString(4);
  if (s[0] == 1) {
    for (let i = 1; i < s.length; i++) {
      if (s[i] != 0) {
        return false;
      }
    }
    return true;
  }
  return false;
}

// 提取url中的key和value
let baseUrlStr = "https://coder.itclan.cn?name=itclanCoder&study=css";
function getKeyandValue(urlStr) {
  let arr1 = urlStr.split("?")[1];
  // 得做条件判断，是否继续执行
  if (arr1.length <= 1) {
    return [];
  }
  let arr = arr1.toString().split("&");
  // 此时arr中有多个键值，每对都成为了数组一项
  let map = new Map();
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i].split("=");
    map.set(temp[0], temp[1]);
  }
  return map;
}
// console.log(getKeyandValue(baseUrlStr))

// 实现一个取obj值的get方法
var obj = {
  a: {
    b: 2,
  },
};
// console.log(obj.a.b) // 和这个结果一样
function getValue(obj, key) {
  // 判断类型是否传入正确
  if (typeof key !== "string") {
    throw new Error("参数传入错误！");
  }
}

// 转为千分位
function format(num) { }
// console.log(format(1234567));

let s = "abbbaca";
function Reduplicate(arr) {
  // 使用辅助栈的压入和弹出机制来去除连续字母
  let stack = [];
}

// 给定一个经过编码的字符串，返回它解码后的字符串。
// 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
// 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
// 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

// 输入：s = "3[a]2[bc]"
// 输出："aaabcbc"

// 输入：s = "2[abc]3[cd]ef"
// 输出："abcabccdcdcdef"

// 2[abc]3[bcd2[ccc]]
// abcabcbcdccccccbcdccccccbcdcccccc

// 15:25
// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
// 你可以按任意顺序返回答案。
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
// 15:32
function merge(nums, key) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }
  for (let i = 0; i < nums.length; i++) {
    if (map.has(key - nums[i])) {
      return [i, map.get(key - nums[i])];
    }
  }
  return null;
}
let nums = [2, 7, 11, 15],
  target = 9;
// console.log(merge(nums, target));

// 扁平数组转树
// let arr = [
//   { id: 1, name: "部门1", pid: 0 },
//   { id: 2, name: "部门2", pid: 1 },
//   { id: 3, name: "部门3", pid: 1 },
//   { id: 4, name: "部门4", pid: 3 },
//   { id: 5, name: "部门5", pid: 4 },
// ];

// function toTree(arr) {
//   let res;
//   let map = new Map();
//   arr.forEach((item) => {
//     map.set(item.id, item);
//   });

//   arr.forEach((item) => {
//     let pid = item.pid;
//     if (pid === 0) {
//       res = item;
//     } else if (map.has(pid)) {
//       let parent = map.get(pid);
//       if (!parent.children) {
//         parent.children = [];
//       }
//       parent.children.push(item);
//     }
//   });
//   return res;
// }

// console.log(toTree(arr));

// 对象的解构赋值
const obj2 = {
  a: "aulaia",
  age: 18,
};
const { a } = obj2;
// console.log(a); // aulaia

//

// 格式化字符串的次数 微软面试题
function formatWords(words) {
  // 使用 map
  const map = new Map();
  for (item of words) {
    // 遍历字符串，处理每个字符
    if (map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  }
  const resNum = [];
  // 判空，返回0。
  if (
    !map.has("B") ||
    !map.has("A") ||
    !map.has("O") ||
    !map.has("L") ||
    !map.has("N")
  ) {
    return 0;
  }
  for (item of map.keys()) {
    if (item === "B" || item === "A" || item === "N") {
      resNum.push(map.get(item));
    }
    if (item === "O" || item === "L") {
      resNum.push(map.get(item) / 2);
    }
  }
  return parseInt(Math.min(...resNum));
}

// console.log(formatWords('BBAOONXXOLL')); // 1

// 找出最长不重复子串
const lengthOfLongestSubstring = (str) => {
  // 滑动窗口
  let len = str.length,
    left = 0,
    right = 0,
    res = 0;
  const map = new Map();
  while (right < len) {
    let s = str[right];
    if (map.has(s)) {
      map.set(s, map.get(s) + 1);
    } else {
      map.set(s, 1);
    }
    right++;
    // 有重复的
    while (map.get(s) > 1) {
      let c = str[left];
      map.set(c, map.get(c) - 1);
      left++;
    }
    res = res > right - left ? res : right - left;
  }
  return res;
};

// console.log(lengthOfLongestSubstring("aaasdfdd"));  // 4

const newSum = (num) => {
  return num > 0 && newSum(num - 1) + num;
};
// console.log(newSum(3)); // 6


// 颜色转换 rgb(255,255,255)
const _rgb = (...args) => {
  if (args.length !== 3) return "Input Error!"
  return [...args].map(e => Number(e).toString(16)).reduce((a, b) => a.toUpperCase() + b.toUpperCase());
};

// console.log(_rgb(255, 255, 255));

// this指向
// window.b = 1;
// function fn() {
//   console.log(this.b);
// }
// const fn2 = () => {
//   console.log(this.b);
// }
// const A = {
//   b: 2,
//   k: () => {
//     return fn();
//   },
//   o: function () {
//     return fn();
//   },
//   l: () => {
//     return fn2();
//   },
//   p: function () {
//     return fn2();
//   },
//   j: () => {
//     fn.call(this);
//   },
//   u: function () {
//     fn.call(this);
//   }
// }
// A.k(); // 返回了一个函数，this指向window，输出1。
// A.o(); // 是一个函数，函数的this指向全局，输出1。
// A.l(); // 是箭头函数+箭头函数，还是一个箭头函数，取决于执行作用域，输出1。
// A.p(); // 函数的指向是全局，下面的箭头函数的执行环境自然指向全局，输出1。
// A.j(); // 箭头函数中的this不能被call改变，依然是全局作用域的，输出1。
// A.u(); // this指向被改变，输出2。

// this指向
// var C = {
//   test: function () {
//     console.log(this)
//   },
//   test2: () => {
//     console.log(this)
//   }
// }
// var b = {}
// b.test = C.test
// b.test2 = C.test2

// C.test(); // 是一个方法，打印C
// b.test(); // b？和c一样。
// C.test2(); // 箭头函数，window
// b.test2(); // 箭头函数，window

// 原型链
Object.prototype.b = 'clive';
// const B = { 'a': 1, 'b': 2, 'c': 3 };
const B = 'cvbnm'; // 字符串是类数组结构，有迭代器。
for (let i of B) { // 不能使用for…of，因为对象没有迭代器。
  // console.log(i);
}

// js限流器
// class Scheduler {
//   queue = new Set()
//   add() {
//     if (this.queue.size >= 2) {
//       const queueArr = [];
//       this.queue.forEach(item => queueArr.push(item));
//       return Promise.race(queueArr)
//         .finally(() => this.add(promiseCreator));
//     } else {
//       const promise = promiseCreator();
//       this.queue.add(promise);
//       promise.finally(() => {
//         this.queue.delete(promise);
//       });
//       return promise;
//     }
//   }
// }

// 限流器
class Scheduler {
  concurrency = 2
  running = 0
  queue = []

  add(task) {
    return new Promise(resolve => {
      this.queue.push({
        taskGenerator: task,
        resolve
      })
      this.schedule()
    })
  }

  schedule() {
    while (this.queue.length > 0 && this.running < this.concurrency) {
      const curTask = this.queue.shift()
      this.running += 1
      curTask.taskGenerator().then(result => {
        this.running -= 1
        curTask.resolve(result)
        this.schedule()
      })
    }
  }
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}

// addTask(1000, '1')
// addTask(500, '2')
// addTask(300, '3')
// addTask(400, '4')

// [1,2,3,4,5,1,2,3,4,5]

Array.prototype.copy = function () {
  console.log([...this,...this]);
};
[1, 2, 3, 4, 5].copy();
