/**
 * 格子
 */
import React from 'react';

// 定义棋盘格子组件的属性接口
export interface SquareProps {
  value: string | null; // 格子的值，可以是字符串或null
  onSquareClick?: () => void; // 点击格子时触发的可选回调函数
}

// 棋盘格子组件
export function Square(props: SquareProps) {
  // 解构props，获取value和onSquareClick
  const { value, onSquareClick } = props;

  // 渲染一个按钮作为棋盘格子
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
