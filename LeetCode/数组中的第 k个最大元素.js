// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。
// 算法解析
// 1.构建最大堆：首先我们从最后一个非叶子节点开始（即Math.floor(n / 2) - 1），自底向上调用heapify函数，将整个数组构建成一个最大堆。
// 2.提取前k个最大元素：通过k-1次循环，每次将堆顶元素（当前最大值）与数组末尾元素交换，然后对剩余元素重新堆化。这样每次循环都能将当前最大值放到数组的末尾。
// 3.返回结果：经过k-1次交换后，第k个最大元素就会位于nums[n-k]的位置。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const n = nums.length;

  // 构建最大堆
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(nums, n, i);
  }

  // 依次移除堆顶元素(k-1次)
  for (let i = n - 1; i >= n - k; i--) {
    // 将当前最大值(堆顶)移动到数组末尾
    [nums[0], nums[i]] = [nums[i], nums[0]];
    // 对剩余元素重新堆化
    heapify(nums, i, 0);
  }

  // 第k个最大元素现在位于nums[n-k]位置
  return nums[n - k];
};

/**
 * 堆化函数（维护最大堆性质）
 * @param {number[]} arr - 堆数组
 * @param {number} n - 堆的大小
 * @param {number} i - 当前节点索引
 */
function heapify(arr, n, i) {
  let largest = i;    // 初始化最大值为当前节点
  const left = 2 * i + 1;  // 左子节点索引
  const right = 2 * i + 2; // 右子节点索引

  // 找出当前节点、左右子节点中的最大值
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  // 如果最大值不是当前节点，则交换并递归调整
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
