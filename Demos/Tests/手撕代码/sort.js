var num = [5, 2, 6, 3, 8, 1, 0, 4];
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
// console.log(_BinarySearch(num, 4, 0, num.length - 1));

// 稳定排序
// 冒泡排序（交换型）
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        [arr[j], arr[i]] = [arr[i], arr[j]];
      }
    }
  }
  return arr;
};
// console.log(bubbleSort(num));

// 直接插入排序
// 分为有序区和无序区，无序区往有序区正确插入，直到无序区清空。
const insertSort = (array) => {
  //    i表示：拿出来的无序区的数字的下标
  for (let i = 1; i < array.length; i++) {
    //   j表示：有序区的最后一个数的下标
    let temp = array[i],
      j = i - 1;
    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j];
      j -= 1;
    }
    array[j + 1] = temp;
  }
  return array;
};

// 归并排序
// 分为两个函数，主函数递归调用归并算法。
const mergeSort = (array) => {
  // 归并方法
  const merge = (left, right) => {
    let result = [];
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    while (left.length) {
      result.push(left.shift());
    }
    while (right.length) {
      result.push(right.shift());
    }
    return result;
  };
  // 主方法调用归并方法
  let len = array.length;
  if (len < 2) {
    return array;
  }
  let mid = Math.floor(len / 2);
  let left = array.slice(0, mid);
  let right = array.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
};

// 基数排序

// 不稳定排序
// 快速排序（交换型）

// 快排：哨兵归位算法
const partition = (array, left, right) => {
  let temp = array[left];
  while (left < right) {
    // 如果右边的值比哨兵大，就直接左移一步，否则就交换。
    while (left < right && array[right] >= temp) {
      right--;
    }
    // 把右边的值放到左边的空位上
    array[left] = array[right];
    while (left < right && array[left] <= temp) {
      left++;
    }
    // 把左边的值放到右边的空位上
    array[right] = array[left];
  }
  array[left] = temp;
  return left;
};

// 递归调用自身即可
const quickSort = (array, left, right) => {
  if (left < right) {
    let mid = partition(array, left, right);
    quickSort(array, left, mid - 1);
    quickSort(array, mid + 1, right);
  }
  return array;
};
// console.log(quickSort(num, 0, num.length - 1));

// 直接选择排序
// 简单思路是创建新数组，每次插入无序区最小的值。
// 改进之后，基于交换的思想，实现原地排序。
const selectSort = (arr) => {
  // 有序区和无序区， 更新无序区最小值的位置
  //排n-1次就行了，剩下来那个肯定是最大值
  for (let i = 0; i < arr.length - 1; i++) {
    let min_local = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min_local] > arr[j]) {
        [arr[min_local], arr[j]] = [arr[j], arr[min_local]];
      }
    }
  }
  return arr;
};

// 堆排序

// 希尔排序
