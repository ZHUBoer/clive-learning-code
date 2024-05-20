/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  s = s.toString();
  // 使用双指针
  // 找到所有的回文串，返回最长的回文串即可
  let arrPalindrome = [];
  // 回文串的长度分情况讨论，奇数和偶数
  for (let index = 0; index < s.length; index++) {
    let i = index;
    let j = index + 1;
    while (s[i] == s[j] && i >= 0 && j < s.length) {
      i--;
      j++;
    }
    arrPalindrome.push(s.slice(i + 1, j));
  }
  for (let index = 0; index < s.length; index++) {
    let i = index;
    let j = index;
    while (s[i] == s[j] && i >= 0 && j < s.length) {
      i--;
      j++;
    }
    arrPalindrome.push(s.slice(i + 1, j));
  }
  // 进行数组去重，再根据长度进行降序排列字符串
  let resArr = [...new Set(arrPalindrome)];
  resArr.sort((a, b) => b.length - a.length);
  return resArr[0];
};
// @lc code=end
