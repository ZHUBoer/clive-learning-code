// 优化后的 mybind
Function.prototype.myBind = function (context, ...bindArgs) {
  const originalFunc = this;

  function boundFunc(...callArgs) {
    // 判断是否通过 new 调用
    const isNewCall = this instanceof boundFunc;

    return originalFunc.apply(
      isNewCall ? this : (context || window),
      bindArgs.concat(callArgs)
    );
  }

  // 保持原型链
  if (originalFunc.prototype) {
    boundFunc.prototype = Object.create(originalFunc.prototype);
  }

  return boundFunc;
};

// 优化后的 myCall
Function.prototype.myCall = function (context, ...args) {
  // 处理原始值和非严格模式
  context = context ? Object(context) : window;

  const fn = Symbol('fn');
  context[fn] = this;

  const result = context[fn](...args);
  delete context[fn];

  return result;
};

// 优化后的 myApply
Function.prototype.myApply = function (context, argsArray) {
  // 参数校验
  if (argsArray && !Array.isArray(argsArray) && !argsArray[Symbol.iterator]) {
    throw new TypeError('第二个参数必须为数组或类数组对象');
  }

  context = context ? Object(context) : window;
  const fn = Symbol('fn');
  context[fn] = this;

  const result = argsArray
    ? context[fn](...argsArray)
    : context[fn]();

  delete context[fn];
  return result;
};
