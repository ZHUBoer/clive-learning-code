// 1. 以下代码输出什么结果，`this.name`中this指向什么：
// window.name = 'ByteDance';
// function A() {
//   this.name = 123; // 指向 window.name = 'ByteDance'; 函数的this指向全局。
// }

// A.prototype.getA = function () { // 原型链的方式挂在了getA作为a的方法，此时的this指向A函数（函数也是对象哦）本身。
//   console.log(this);
//   return this.name + 1; // 函数本身的name为undefined，强制类型转换的话，NAN+1还是NAN。
// }

// let a = new A();
// let funcA = a.getA; // 隐藏指向丢失！赋值给新对象，getA与原上下文就失去了联系。此时的funA是挂在window下面的。
// console.log(this.name);
// funcA(); // this.name是指向window.name，由于函数之前赋值的时候已经执行过一次了，此时window.name为 'ByteDance1'。

// 2. 如何使`funcA()`返回`undefined`?

// 使用bind apply call
window.name = 'ByteDance';
function A() {
  this.name = 123;
}
A.prototype.getA = function () {
  console.log(this);
  return this.name + 1;
}
let a = new A();
let funcA = a.getA;
funcA.call(a); // 使用call/apply改变this指向！
// funcA.bind(a)(); 使用bind

// 3. 下面ES6中又会发生什么，this是什么？
// window.name = 'ByteDance';
// class A {
// 	constructor() {
//   	this.name = 123;
// 	}
// 	getA() {
// 	  console.log(this);
// 		return this.name + 1;
// 	}
// }
// let a = new A();
// let funcA = a.getA;
// funcA();
