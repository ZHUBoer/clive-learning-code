/*
 * @lc app=leetcode.cn id=2 lang=typescript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let cur1 = l1;
  let cur2 = l2;
  const curRes = new ListNode(0);
  let head = curRes;
  while (head.next) {
    const sum = (cur1?.val || 0) + (cur2?.val || 0) + head.val;
    head.val = sum % 10;
    if (sum >= 10) {
      head.next = new ListNode(1);
    }
    head = head.next;
  }
  return curRes;
}

// console.log(addTwoNumbers(null, null));
// @lc code=end
