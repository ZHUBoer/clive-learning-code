/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 *
 * https://leetcode.cn/problems/reverse-linked-list/description/
 *
 * algorithms
 * Easy (74.41%)
 * Likes:    3716
 * Dislikes: 0
 * Total Accepted:    2.1M
 * Total Submissions: 2.8M
 * Testcase Example:  '[1,2,3,4,5]'
 *
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：head = [1,2,3,4,5]
 * 输出：[5,4,3,2,1]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：head = [1,2]
 * 输出：[2,1]
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：head = []
 * 输出：[]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 链表中节点的数目范围是 [0, 5000]
 * -5000 
 * 
 * 
 * 
 * 
 * 进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？
 * 
 * 
 * 
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

class LinkNode {
  constructor(val, next) {
    this.val = val !== undefined ? val : 0;
    this.next = next !== undefined ? next : null;
  }
}

console.log(new LinkNode(0));

/**
 * 反转链表
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // 迭代算法-反转链表
  // 新建一个结果节点，目前是 null，仅有一个null节点（也是所有链表的尾部指向。
  let res = new LinkNode(null);
  while (head !== null) {
    // 保存下一个节点，因为我们需要将当前节点指向新节点，而当前节点需要被保存。
    let next = head.next;
    head.next = res;
    res = head;
    head = next;
  }
};
// @lc code=end


