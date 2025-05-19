import React, { useEffect, useState } from 'react';
// @ts-ignore
import logo from './logo.svg';
import './App.css';
import Button from './components/button'

function App() {
  const [count, setCount] = useState<number>(0);

  const resetCount = () => {
    setCount(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(pre => pre + 20);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button
          className="App-link"
          href="https://cva.style/docs/examples/react/tailwind-css"
          target="_blank"
          rel="noopener noreferrer"
        >
          现在状态: {count}
        </Button>
        <br />
        <Button
          type='reset'
          onClick={resetCount}
        >
          Reset
        </Button>
      </header>
    </div>
  );
}

export default App;
