// 二分查找
const BinarySearch = function (nums, key, left, right) {
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

const findNumberIn2DArray = (matrix, target) => {
  if (!matrix.length || !matrix[0].length) return false;

  const rows = matrix.length;
  const cols = matrix[0].length;
  const nums = matrix.flat();
  const numsLen = nums.length;

  const result = BinarySearch(nums, target, 0, numsLen - 1);

  if (result !== null) {
    // 计算二维坐标
    const row = Math.floor(result / cols);
    const col = result % cols;
    return [row, col];
  } else {
    return false;
  }
};

console.log(findNumberIn2DArray([[0, 2, 3], [4, 5, 9], [10, 18, 19]], 10));


function searchIn2DArray(matrix, target) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }

  let row = 0;
  let col = matrix[0].length - 1; // 从右上角开始查找

  while (row < matrix.length && col >= 0) {
    const current = matrix[row][col];

    if (current === target) {
      return [row, col]; // 找到目标，返回坐标
    } else if (current < target) {
      row++; // 当前值小于目标，向下移动一行
    } else {
      col--; // 当前值大于目标，向左移动一列
    }
  }

  return false; // 未找到目标
}

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = (matrix, target) => {
  let m = matrix.length - 1,
    n = matrix[0].length - 1;
  let i = 0,
    j = m;
  while (i <= n && j >= 0) {
    if (matrix[j][i] > target) {
      j--;
    } else if (matrix[j][i] < target) {
      i++;
    } else if (matrix[j][i] == target) {
      return [j, i];
    }
  }
  return false;
};

console.log(searchMatrix([[0, 2, 3], [4, 5, 9], [10, 18, 19]], 10));
