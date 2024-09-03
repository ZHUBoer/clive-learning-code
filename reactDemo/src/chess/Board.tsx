/**
 * 棋盘
 */
import React from 'react';
import { Square, SquareProps } from './Square';

/**
 * 如果我们想创建一个新的类型，包含 SquareProps 的所有属性，但不包括 onFillSquare 属性，我们可以使用 Omit 来实现这一点
 */

type Squares = Omit<SquareProps, 'onFillSquare'>[];

export interface BoardProps {
  squares?: Squares;
  boardInfo?: string;
  onFillSquare?: (squareIdx: number) => void;
}

interface BoardState {
  clickValueNum: string | null;
}

// 一个边框
export class Board extends React.Component<BoardProps, BoardState> {
  constructor(props) {
    super(props);
    this.state = {
      clickValueNum: '',
    };
  }

  handleClick = (curValue: any) => {
    console.log(curValue);
  };

  renderSquare(i) {
    return <Square value={i} onSquareClick={() => this.handleClick(i)} />;
  }

  render() {
    const status = 'Next player: X';
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export function calculateWinner(squares: Squares) {}
