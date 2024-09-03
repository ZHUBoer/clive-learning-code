/**
 * 格子
 */
import React from 'react';

export interface SquareProps {
  value: string | null;
  onSquareClick?: () => void;
}

export function Square(props: SquareProps) {
  const { value, onSquareClick } = props;
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
