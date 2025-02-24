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
// const myCall = (context) => {
//   const content = context || window;
//   context.fn = this;
//   const args = [...arguments].slice(1);
//   const res = content.fn(...args);
//   delete content.fn;
//   return res;
// };

// 优化后的 myCall
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
}

function greet(greeting) {
  console.log(`${greeting}, ${this.name}!`);
}
const user = { name: 'Alice' };
greet.myCall(user, 'Hello'); // 输出：Hello, Alice!


// apply的入参是对象和类数组
// const myApply = (context) => {
//   const content = context || window;
//   context.fn = this;
//   const args = [...arguments].slice(1).flat();
//   const res = content.fn(...args);
//   delete content.fn;
//   return res;
// };

// 优化后的 myApply
Function.prototype.myApply = function (context, argsArray) {
  context = context || window;
  const fn = Symbol('fn');
  context[fn] = this;
  const result = argsArray ? context[fn](...args) : context[fn]();
  delete context[fn];
  return result;
}