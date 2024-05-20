// 防抖
function debounce(fn, delay = 500) {
  let timer;
  return function () {
    if (timer) {
      clearInterval(timer);
    }
    timer = setTimeout(() => {
      fn.call(this, arguments);
      timer = null;
    }, delay);
  };
}

// 节流
function throttle(fn, delay = 500) {
  let timer;
  return function () {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.call(this, arguments);
      timer = null;
    }, delay);
  };
}
