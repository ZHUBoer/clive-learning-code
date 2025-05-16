// 647. 回文子串
// 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
// 回文字符串 是正着读和倒过来读一样的字符串。
// 子字符串 是字符串中的由连续字符组成的一个序列。

// 示例 1：
// 输入：s = "abc"
// 输出：3
// 解释：三个回文子串: "a", "b", "c"

// 示例 2：
// 输入：s = "aaa"
// 输出：6
// 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"


// 提示：
// 1 <= s.length <= 1000
// s 由小写英文字母组成

/**
 * @param {string} s
 * @return {string}
 */
var countSubstrings = function (s) {
  // 使用双指针
  // 找到所有的回文串
  let count = 0; // 回文数量
  const arrSub = []; // 回文数组

  // 回文串的长度分情况讨论，奇数和偶数
  for (let index = 0; index < s.length; index++) {
    let i = index;
    let j = index + 1;
    while (s[i] == s[j] && i >= 0 && j < s.length) {
      count++;
      arrSub.push(s.slice(i, j + 1));
      i--;
      j++;
    }
  }

  for (let index = 0; index < s.length; index++) {
    let i = index;
    let j = index;
    while (s[i] == s[j] && i >= 0 && j < s.length) {
      count++;
      arrSub.push(s.slice(i, j + 1));
      i--;
      j++;
    }
  }
  // return arrSub.length;
  return count;
};

console.log(countSubstrings('aaa'));