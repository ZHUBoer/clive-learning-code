/**
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 * 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
 * 
 * 示例 1：
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 */

function searchRange(nums, target) {
  const firstPos = findBound(nums, target, true);
  if (firstPos === -1) return [-1, -1];
  const lastPos = findBound(nums, target, false);
  return [firstPos, lastPos];
}

function findBound(nums, target, isFirst) {
  let left = 0;
  let right = nums.length - 1;
  let bound = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      bound = mid;
      if (isFirst) {
        right = mid - 1; // Search left for first occurrence
      } else {
        left = mid + 1;  // Search right for last occurrence
      }
    }
  }

  return bound;
}