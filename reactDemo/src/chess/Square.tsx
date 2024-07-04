/**
 * 格子
 */
import React from 'react';

export interface SquareProps {
  squareContent: string | null;
  onFillSquare?: () => void;
}

interface SquareState {
  value: string | null;
}

export class Square extends React.Component<SquareProps, SquareState> {
  constructor(props: SquareProps) {
    super(props);
    this.state = {
      value: null,
    };
  }
  handleClick = () => {
    this.setState({
      value: 'X',
    });
    this.props.onFillSquare && this.props.onFillSquare();
  };

  render() {
    return (
      <button
        className='square'
        onClick={this.handleClick}
      >
        {this.state.value}
      </button>
    );
  }
}
