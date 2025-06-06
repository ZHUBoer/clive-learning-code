/*
 * @lc app=leetcode.cn id=165 lang=typescript
 *
 * [165] 比较版本号
 *
 * https://leetcode.cn/problems/compare-version-numbers/description/
 *
 * algorithms
 * Medium (52.26%)
 * Likes:    445
 * Dislikes: 0
 * Total Accepted:    197K
 * Total Submissions: 369.9K
 * Testcase Example:  '"1.2"\n"1.10"'
 *
 * 给你两个 版本号字符串 version1 和 version2 ，请你比较它们。版本号由被点 '.' 分开的修订号组成。修订号的值 是它 转换为整数
 * 并忽略前导零。
 * 
 * 比较版本号时，请按 从左到右的顺序 依次比较它们的修订号。如果其中一个版本字符串的修订号较少，则将缺失的修订号视为 0。
 * 
 * 返回规则如下：
 * 
 * 
 * 如果 version1 < version2 返回 -1，
 * 如果 version1 > version2 返回 1，
 * 除此之外返回 0。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：version1 = "1.2", version2 = "1.10"
 * 
 * 输出：-1
 * 
 * 解释：
 * 
 * version1 的第二个修订号为 "2"，version2 的第二个修订号为 "10"：2 < 10，所以 version1 <
 * version2。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：version1 = "1.01", version2 = "1.001"
 * 
 * 输出：0
 * 
 * 解释：
 * 
 * 忽略前导零，"01" 和 "001" 都代表相同的整数 "1"。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：version1 = "1.0", version2 = "1.0.0.0"
 * 
 * 输出：0
 * 
 * 解释：
 * 
 * version1 有更少的修订号，每个缺失的修订号按 "0" 处理。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= version1.length, version2.length <= 500
 * version1 和 version2 仅包含数字和 '.'
 * version1 和 version2 都是 有效版本号
 * version1 和 version2 的所有修订号都可以存储在 32 位整数 中
 * 
 * 
 */

// @lc code=start
/**
 * 比较两个版本号字符串
 * @param version1 第一个版本号字符串
 * @param version2 第二个版本号字符串
 * @returns 比较结果：1(version1 > version2), -1(version1 < version2), 0(相等)
 */
function compareVersion(version1: string, version2: string): number {
  // 将版本号按点号分割成修订号数组
  const revisions1: string[] = version1.split('.');
  const revisions2: string[] = version2.split('.');
  // 取两个版本号的最大长度，处理不同长度的情况
  const maxLength = Math.max(revisions1.length, revisions2.length);

  // 逐位比较修订号
  for (let i = 0; i < maxLength; i++) {
    // 将修订号转换为整数（自动忽略前导零）
    // 使用 || '0' 处理数组越界情况（当版本号长度不一致时）
    const revision1 = parseInt(revisions1[i] || '0', 10);
    const revision2 = parseInt(revisions2[i] || '0', 10);

    // 比较当前位修订号
    if (revision1 > revision2) return 1;  // version1 > version2
    if (revision1 < revision2) return -1; // version1 < version2
    // 修订号相等时继续比较下一位
  }

  // 所有修订号均相等
  return 0;
};
// @lc code=end


