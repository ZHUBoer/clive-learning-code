// 手动实现：函数的柯里化
/**
 * 适合函数的链式调用
 * fn参数，按序调用
 * 未调用结束的时候都是返回一个函数，直到调用结束为止才返回 fn的返回值
 */

function _curry(fn) {
  return function _curried(...args) { // 一定是参数列表，而不是类数组
    return args.length >= fn.length
      ? fn.apply(this, args)
      : (...more) => _curried.apply(this, args.concat(more)); // 也是一个递归
  }
}

const curriedAdd = _curry((a, b, c) => a + b + c);
console.log(curriedAdd(2)(3)(4)); // 9