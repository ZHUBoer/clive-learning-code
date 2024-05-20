import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// 一个方块
class Square extends React.Component {
    constructor(props) {
        super(props);
        // 此处的 state 是直接被 setState 所改变的。
        this.state = {
            value: null,
        }
    }

    render() {
      return (
        <button className="square"
        onClick={()=>{
            this.setState({value: 'X'});
        }}
        >
          {this.props.value}
        </button>
      );
    }
  }
  // 一个边框
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={i}/>;
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
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  