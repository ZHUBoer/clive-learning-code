/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

function merge(intervals) {
  // 先要数组排序，根据左边界的大小来排序。
  // 区分左边界和右边界，左边界和右边界的舍去需要条件。
  // intervals[i]的右边界大于等于intervals[i+1]的左边界，则可合并区间。
  // 从排序后的二维数组开始操作
  intervals.sort((a, b) => a[0] - b[0]);
  let merged = [intervals[0]];
  for (let i = 0; i < intervals.length; i++) {
    let last = merged[merged.length - 1]; // 一个一个放进去，拿出最后的来比较
    let current = intervals[i]; // 从头部逐个拿出来和新数组最后一个比较
    if (current[0] <= last[1]) {
      // 合并这两个区间
      last[1] = Math.max(current[1], last[1]);
    } else {
      // 不合并区间
      merged.push(current);
    }
  }

  return merged;
};

const test = [[2, 6], [8, 10], [1, 3], [15, 18]];
console.log(merge(test));

// @lc code=end

