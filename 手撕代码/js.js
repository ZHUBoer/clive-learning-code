// bind返回的是一个未执行的方法。
const myBind = (context) => {
  const content = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  return function () {
    // 只能执行一次………
    const res = content.fn(...args);
    delete content.fn;
    return res;
  };
};

// call的入参可以是多个参数
const myCall = (context) => {
  const content = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const res = content.fn(...args);
  delete content.fn;
  return res;
};

// apply的入参是对象和类数组
const myApply = (context) => {
  const content = context || window;
  context.fn = this;
  const args = [...arguments].slice(1).flat();
  const res = content.fn(...args);
  delete content.fn;
  return res;
};

// 使用setTimeOut来实现setIntervel
const mySetIntervel = (fn, delay, times) => {
  let timer = setTimeout(function a() {
    fn;
    times--;
    timer = setTimeout(a, delay);
    if (timer <= 0) {
      clearTimeout(timer);
    }
  }, delay);
}

/**
 * 节流函数
 * 原理：固定间隔内，第一次有效，之后的忽略
 * 场景：鼠标点击事件，连续快速点击(单位时间内只触发一次)
 *      监听滚动事件，比如是否滑到底部自动加载更多，用节流来判断
 * */
const throttle = (fn, delay) => {
  let content = this;
  let args = arguments;
  let timer;
  return function () {
    if (timer) {
      return (timer = setTimeout(function () {
        fn.apply(content, args);
        timer = null;
      }, delay));
    }
  };
}

/**
 * 防抖函数
 * 原理：固定间隔内，只执行最后一次触发的
 * 场景：搜索联想，用户在不断输入值时，用防抖来节约请求资源
 *       window的 resize，只需窗口调整完成后，计算窗口的大小，防止重复渲染。
 * */
const debounce = (fn, delay) => {
  let timer;
  return function () {
    let content = this;
    let args = arguments;
    clearInterval(timer);
    timer = setTimeout(function () {
      fn.apply(content, args);
    }, delay);
  };
}

// 创建链表结构
class listNode {
  constructor(value) {
    this.val = value;
    this.next = null;
  }
}
let node = new listNode("value0");
let node1 = new listNode("value1");
node.next = node1;
// console.log(node.next);
// listNode { val: 'value1', next: null }

//  创建树结构
class treeNode {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

let tree = new treeNode("root");
// console.log(tree);
// treeNode { val: 'root', left: null, right: null }

// 实现发布订阅
// 初始化设计, 使用队列来实现
// const eventHub = {
//   on: (eventName, callback) => {},
//   emit: (eventName, ...arguments) => {},
//   off: (eventName, callback) => {},
//   once: (eventName, callback) => {},
// };
// eventHub.on("click", fn); // 注册订阅
// eventHub.off("click", fn); // 取消订阅
// eventHub.emit("click", 'frank'); // 发布，执行事件队列，将 'frank'作为事件队列中对应的回调函数的入参。
// eventHub.once("click", fn); // 单次注册订阅，执行一次就会取消订阅

// 具体实现
// 创建一个类，初始化一个事件存储中心
class EventEmitter {
  // 构造函数，存放注册的事件与回调
  constructor() {
    this._events = {};
  }
  // 订阅方法 on
  // 将事件的回调函数存储在对应的事件上
  on(eventName, callback) {
    // 一个事件可能注册多个回调函数，所以使用数组来存储事件队列
    const callbacks = this._events[eventName] || []; // 若已存在，则增加；否则就创建。
    callbacks.push(callback);
    this._events[eventName] = callbacks;
  }

  // 发布事件 emit
  // 获得事件对应的回调函数并依次执行
  emit(eventName, ...args) {
    const callbacks = this._events[eventName] || [];
    // 依次执行
    callbacks.forEach((element) => {
      element(...args);
    });
  }

  // 取消订阅 off
  // 找到对应的回调函数，删除对应的回调函数；
  off(eventName, callback) {
    const callbacks = this._events[eventName] || [];
    const newCallbacks = callbacks.filter((item) => item !== callback);
    this._events[eventName] = newCallbacks;
  }

  // 单次订阅 once
  // 先注册，事件执行后就取消；
  once(eventName, callback) {
    // 先封装一个函数，用来在执行后就取消订阅当前事件；
    const one = (...args) => {
      callback(...args);
      this.off(eventName, one);
    };
    // 注册，将封装好的函数注入；
    this.on(eventName, one);
  }
}

// 柯里化函数
function curry(fn, args) {
  return function () {
    let newArgs = [...arguments, ...args];
    if (newArgs.length < fn.length) {
      return curry.call(this, fn, newArgs); // this.curry(fn,newArgs);
    } else {
      return fn.apply(this, newArgs); // this.fn(newArgs);
    }
  };
}
const _curry = (fn, args) => {
  return args.length >= fn.length
    ? fn(...args)
    : (..._args) => {
      curry(fn, ...args, ..._args);
    };
};

// 实现add(1)(2)(3)
function add(...args) {
  return args.reduce((a, b) => {
    return parseInt(a) + parseInt(b);
  }
  );
}
function currying(fn) {
  let args = []
  return function temp(...newArgs) {
    if (newArgs.length) {
      args = [...args, newArgs];
      return temp;
    } else {
      let val = fn.apply(this, args);
      args = [];
      return val;
    }
  }
}
let addCurry = currying(add);
// console.log(addCurry(1)(2)(3)());

// instanceof
function myInstanceof(left, right) {
  let proto = left.__proto__; // 左边是实例 实例的原型是 __proto__
  let prototype = right.prototype; // 右边是构造函数

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = left.__proto__;
  }
}
// console.log(myInstanceof([1, 2, 3], Array));

// ES5中使用call和apply来实现bind
var myBind2 = function (context) {
  // 先判断调用者的类型是不是function
  if (typeof this != "function") {
    return "caller must be function";
  }
  var self = this;
  context = context || window;
  var args = Array.prototype.slice.call(arguments, 1);
  // ES6中写法：let args = [...arguments].slice(1);
  return function () {
    var bindArgs = Array.prototype.slice.call(arguments, 1);
    // let bindArgs = [...arguments].slice(1);
    return self.apply(context, args.concat(bindArgs));
  };
};

// 生成二维数组
let arr = new Array(10).fill(0).map(() => new Array(10).fill(0));

// 实现二分查找
// 输入：有序数组，key值
// 输出：key值对应的索引
const BinarySearch = function (nums, key, left, right) {
  if (left > right) return null;
  let mid = (left + right) >> 1;
  let midVal = nums[mid];
  if (midVal < key) {
    // 目标值在右侧，则将将左边界置为 mid+1
    return BinarySearch(nums, key, mid + 1, right);
  } else if (midVal > key) {
    return BinarySearch(nums, key, left, mid - 1);
  } else {
    return mid;
  }
};
// 不使用递归，直接更新左右端点。
const _BinarySearch = function (nums, key, left, right) {
  if (left > right) return null;
  while (left <= right) {
    let mid = (left + right) >> 1;
    if (nums[mid] > key) {
      right = mid - 1;
    } else if (nums[mid] < key) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
};

// 数据劫持：data是对象，key是属性，重写set和get
// Object.defineProperty(data, key, {
//   set: (newValue) => {
//     key = newValue;
//   },
//   get: () => {
//     return key;
//   },
// });

// 图片懒加载
// let imgList = [...document.querySelectorAll("img")];
// let length = imgList.length;

// const imgLazyLoad = (function () {
//   let count = 0;
//   return function () {
//     let deleteIndexList = [];
//     imgList.forEach((img, index) => {
//       // 获得页面中某个元素的左，上，右，下分别相对浏览器视窗的位置
//       let rect = img.getBoundingClientRect();
//       if (rect.top < window.innerHeight) {
//         img.src = img.dataset.src;
//         deleteIndexList.push(index);
//         count++;
//         if (count === length) {
//           document.removeEventListener("scroll", imgLazyLoad);
//         }
//       }
//     });
//     imgList = imgList.filter((img, index) => !deleteIndexList.includes(index));
//   };
// })();

// // 监听滚动事件
// document.addEventListener("scroll", imgLazyLoad);

// 继承
// 原型链继承
class Animal {
  constructor() {
    this.colors = ["black", "white"];
  }
}

Animal.prototype.getColor = function () {
  return this.colors;
};
function Dog() { }
Dog.prototype = new Animal();

let dog1 = new Dog();
dog1.colors.push("yellow");

let dog2 = new Dog();
// console.log(dog2.colors);
// [ 'black', 'white', 'yellow' ]

/**
 * 总结：原型链继承的问题：
 *    1. 原型中包含的引用类型属性会被所有实例共享；
 *    2. 子类在实例化时不能给父类构造函数传参；
 */

// 借用构造函数实现继承
function Animal1(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  };
}

function Dog1(name) {
  Animal1.call(this, name);
}
Dog1.prototype = new Animal1();
// 可以传参
let dog3 = new Dog1("dack");
// console.log(dog3.getName()); // dack

/**
 * 解决了引用类型共享问题以及传参问题；
 * 但方法必须定义在构造函数中，导致每次创建子类实例都会创建一遍方法。
 */

// TODO: 组合继承，结合原型链和构造函数
// 基本思路是使用原型链继承原型上的方法和属性，通过构造函数继承实例属性。
// 既可以吧方法定义在原型上以实现重用，又能每个实例都有自己的属性。
function Animal2(name) {
  this.name = name;
  this.colors = ["white", "yellow"];
}

Animal2.prototype = function getName() {
  return this.name;
};

function Dog2(name, age) {
  this.age = age;
  Animal2.call(this, name);
}
Dog2.prototype = new Animal2();
Dog2.prototype.constructor = Dog2; // 不指定构造器的话，Dog2只是个‘function’而已；
let dog4 = new Dog2("wang", 26);
let dog5 = new Dog2("liu", 25);
dog4.colors.push("black");
// console.log(dog4); // { age: 26, colors: [ 'white', 'yellow', 'black' ] }
// console.log(dog5); // { age: 25, colors: [ 'white', 'yellow' ] }
/**
 * 还是存在问题，父类的构造函数调用了两次， Animal2.call(this, name);以及Dog2.prototype = new Animal2();
 * 解决方案：不直接调用父类构造函数给子类原型赋值，而是通过创建空函数 F 获取父类原型的副本。此时第二次构造函数的调用就减少了。
 * 即=>寄生组合式继承。
 */

// 寄生组合式继承，基于组合式继承实现
Dog2.prototype = Object.create(Animal2.prototype);
Dog2.prototype.constructor = Dog2;

// class实现继承
class Animal3 {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
class Dog3 extends Animal3 {
  constructor(name, age) {
    // 子类继承父类里面的方法可以直接调用，属性需要调用super去执行
    super(name);
    this.age = age;
  }
}
let dog6 = new Dog3("liu", 26);
// console.log(dog6.getName()); // liu

// 测试Map的特性
let map = new Map();
map.set(1, 5);
map.set(2, 4);
map.set(1, 3); // 将 1 => 5变成1 => 3
// console.log(map); // Map(2) { 1 => 3, 2 => 4 }
// console.log(map.constructor); // [Function: Map]

/**
 * 当你调用 `[1, 2, 3].map(parseInt)` 时，实际上 `parseInt` 会接收到三个参数：
 * - `当前值`（array element）
 * - `当前索引`（index）
 * - `原数组`（array）
 * 因此，执行过程如下：
 * - 对于第一个元素 `1`，`parseInt` 被调用：`parseInt(1, 0)`（index为0，0表示自动推断基数，结果为1）
 * - 对于第二个元素 `2`，`parseInt` 被调用：`parseInt(2, 1)`（index为1，1不是有效基数，结果为NaN）
 * - 对于第三个元素 `3`，`parseInt` 被调用：`parseInt(3, 2)`（index为2，2表示二进制，结果为NaN）
 */
// console.log(488,[1, 2, 3].map(parseInt));

const arrayT = [
  [3, 'three'],
  [1, 'one'],
  [2, 'two']
];
const mapT = new Map(arrayT);  // 数组转map
// console.log(mapT); // map
// console.log(new Map(arrayT.sort((a, b) => a[0] - b[0]))); // 升序排列的数组
