import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'https://github.com/ZHUBoer/clive-learning-code/blob/main/reactDemo/src/style/theme-pack.css';
import 'https://github.com/ZHUBoer/clive-learning-code/blob/main/reactDemo/src/style/global.scss';
import { Game } from './chess/Game';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);
