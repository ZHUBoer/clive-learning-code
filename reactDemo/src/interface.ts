export interface SquareProps {
  squareContent: string | null;
  onFillSquare: () => void;
}

/**
 * 如果我们想创建一个新的类型，包含 SquareProps 的所有属性，但不包括 onFillSquare 方法，我们可以使用 Omit 来实现这一点
 */
type Squares = Omit<SquareProps, 'onFillSquare'>[];

export interface BoardProps {
  squares: Squares;
  boardInfo: string;
  onFillSquare: (squareIdx: number) => void;
}

type BoardPropsFiltered = Omit<BoardProps, 'onFillSquare'>;
type Player = 'X' | 'O';

export interface GameProps {
  // 记录棋盘历史
  history: BoardPropsFiltered[];
  // 当前处在历史记录的哪个记录中
  currentHistoryIdx: number;
  // 下一个落棋玩家
  nextPlayer: Player;
}
