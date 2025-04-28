/**
 * 优化的冒泡排序算法（交换型）, 增加了标志位，记录是否有交换
 * @param {Array} arr 待排序数组
 * @return {Array} 排序后的数组
 */
const bubbleSort = (arr) => {
  // 边界条件检查
  if (!Array.isArray(arr) || arr.length <= 1) {
    return arr;
  }

  const len = arr.length;
  // 外层循环控制排序轮数
  for (let i = 0; i < len - 1; i++) {
    // 添加标志位，记录本轮是否发生交换
    let swapped = false;

    // 内层循环控制每轮比较次数
    // 优化点：每次循环后，最大的元素会冒泡到最后，所以可以减少比较次数
    for (let j = 0; j < len - 1 - i; j++) {
      // 相邻元素比较
      if (arr[j] > arr[j + 1]) {
        // ES6解构赋值交换元素
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // 如果本轮没有发生交换，说明数组已有序，提前退出
    if (!swapped) {
      break;
    }
  }

  return arr;
};



console.log(bubbleSort([4, 2, 5, 1, 3])); // 输出: [1,2,3,4,5]
console.log(bubbleSort([5, 4, 3, 2, 1])); // 正确输出 [1,2,3,4,5]

