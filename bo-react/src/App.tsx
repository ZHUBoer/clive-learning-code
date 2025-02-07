import React from 'react';
// @ts-ignore
import logo from './logo.svg';
import './App.css';
import Button from './components/button'

function App() {
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
          Learn cva
        </Button>
      </header>
    </div>
  );
}

export default App;
