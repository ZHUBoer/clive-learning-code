/*
 * @lc app=leetcode.cn id=160 lang=typescript
 *
 * [160] 相交链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 */
// class ListNode {
//   val: number;
//   next: ListNode | null;

//   constructor(val?: number, next?: ListNode | null) {
//     this.val = val === undefined ? 0 : val;
//     this.next = next === undefined ? null : next;
//   }
// }

function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  // map 解法
  let mapA = new Map<ListNode, boolean>();
  let curA = headA;
  while (curA) {
    mapA.set(curA, true);
    curA = curA.next;
  }

  let curB = headB;
  while (curB) {
    if (mapA.has(curB)) {
      return curB;
    }
    curB = curB.next;
  }

  return null;

  // 相同长度解法 min+max即为共同长度，相交节点必然同时到达。每步比对即可得到结果。
}
// @lc code=end
