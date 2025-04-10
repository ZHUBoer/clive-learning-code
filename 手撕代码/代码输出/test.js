// 关于原型链的输出问题
function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}
/**
 * 在函数赋值语句，先在当前作用域内部寻找有无该变量，若无；则去上一级作用域找，直到最外层的window，若找不到，就创建该函数。
 */

// 请写出以下输出结果：
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3

// 考察执行作用域
// function bar() {
//   var myName = " 极客世界 ";
//   let test1 = 100;
//   if (1) {
//     let myName = "Chrome 浏览器 ";
//     console.log(test);
//   }
// }
// function foo() {
//   var myName = " 极客邦 ";
//   let test = 2;
//   {
//     let test = 3;
//     bar();
//   }
// }
// var myName = " 极客时间 ";
// let myAge = 10;
// let test = 1;
// foo(); // 1
// 在函数bar的内部没有test变量，则去上一次执行作用域寻找，即window的test，为1。

// 考察局部作用域 和 赋值语句执行顺序（从右向左）
// (function () {
//   var x = (y = 1);
// })();
// var z;
// console.log(y); // 1
// console.log(z); // undefined
// console.log(x); // 此处 x是局部变量，引用报错。

// 局部作用域和全局作用域
// var a, b;
// (function () {
//   console.log(a); // undefined
//   console.log(b); // undefined
//   var a = (b = 3);
//   console.log(a); // 3
//   console.log(b); // 3
// })();
// console.log(a); // undefined
// console.log(b); // 3

// 变量提升 将function和var 提到当前作用域的头部；
// var friendName = "World";
// (function () {
//   if (typeof friendName === "undefined") {
//     var friendName = "Jack";
//     console.log("Goodbye " + friendName);
//   } else {
//     console.log("Hello " + friendName);
//   }
// })();
// 变量提升后，相当于
// var friendName = "World";
// (function () {
//   var friendName; // 此时是undefined
//   if (typeof friendName === "undefined") {
//     friendName = "Jack";
//     console.log("Goodbye " + friendName);
//   } else {
//     console.log("Hello " + friendName);
//   }
// })();

// 作用域
// var a=3;
// function c(){
//    console.log(a);
// }
// (function(){
//  var a=4;
//  c(); // 该函数是全局函数 只会找全局的变量
// })();

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
// console.log(BinarySearch([1, 2, 3, 4], 4, 0, 3));

// class Class1 {
//   constructor() {
//     console.log("初始化");
//   }
//   method(param) {
//     console.log(param);
//     return this;
//   }
// }
// let cl = new Class1();
// 由于new 在实例化的时候this会指向创建的对象， 所以this.method这个方法会在原型链中找到。
// cl.method("第一次调用").method("第二次链式调用").method("第三次链式调用");

// console.log(String('111')==='111');

// console.log(5 + "2"); // 52 // 字符串优先
// console.log(5 - "2"); // 3
// console.log(5 * '2'); // 10

// 事件循环
// async function async1() {
//   console.log(1);
//   const result = await async2();
//   console.log(3);
// }

// async function async2() {
//   console.log(2);
// }

// Promise.resolve().then(() => {
//   console.log(4);
// });

// setTimeout(() => {
//   console.log(5);
// });

// async1();
// console.log(6);

// 1 2 6 4 3 5

// this指向  构造器调用模式，其上下文对象则是新建的对象实例。
// window.name = 'ByteDance';
// class A {
//   constructor() {
//     this.name = 123;
//   }
//   getA() {
//     console.log(this);
//     return this.name + 1;
//   }
// }
// let a = new A();
// let funcA = a.getA;
// funcA();  // funcA()的执行上下文是window => 执行结果是 ‘ByteDance1’

var quo = function (string) {
  this.status = string;
}
quo.prototype.get_status = function () {
  return this.status;
}
var qq = new quo("aaa");
console.log(qq.get_status());

