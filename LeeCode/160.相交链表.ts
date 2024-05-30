/*
 * @lc app=leetcode.cn id=160 lang=typescript
 *
 * [160] 相交链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 */
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
  }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {

  // map 解法
  let mapA = new Map();
  let urA = headA;
  while (urA) {
    mapA.set(urA, true);
    urA = urA.next;
  }

  let mapB = new Map();
  let urB = headB;
  while (urB) {
    mapB.set(urB, true);
    urB = urB.next;
  }

  for(let [key, value] of mapA) {
    if(mapB.has(key)) {
      return key;
    }
  }
  return null;

  // 相同长度解法 min+max即为共同长度，相交节点必然同时到达。每步比对即可得到结果。
  
};
// @lc code=end

