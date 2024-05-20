// // hooks 封装
// export function useInterval(fn, delay, times, deps) {
//   useEffect(()=>{
//     let timer = setTimeout(function run() {
//       fn(deps);
//       if (times > 0) {
//         times--;
//       }
//       timer = setTimeout(run, delay);
//       if (times !== undefined && times <= 0) {
//         clearTimeout(timer);
//       }
//     }, delay);
//     return function() {
//       clearTimeout(timer);
//     }
//   },[deps]);
// }saa

// 可以逐步实现选择器的深度
// 比如实现class
function matchSelector(selector, element) {
  if (Array.prototype.includes.call(element.classList, selector.slice(1)))
    return true;
  return false;
}

function querySelector(selector, element) {
  if (element === null) return null;
  const children = element.children;
  let res = null;
  for (let child of children) {
    if (matchSelector(selector, child)) return child;
    res = querySelector(selector, child);
    if (res !== null) return res;
  }
  return null;
}

querySelector(".test", document.body);

const parse = (selector) => {
  let resObj = {}; // 输出对象
  const _class = String(selector).split("#")[0];
  if (_class) {
    resObj.tag = _class;
  }
  const _id = String(selector).split("#")[1].split(".")[0];
  if (_id) {
    resObj.id = _id;
  }
  // className
  const _className = String(selector)
  // child
  const _child = String(selector).split(' ')[1];
  if(_child) {
   let tmp = parse(_child);
   resObj.child = tmp;
  }
  return resObj;
};
