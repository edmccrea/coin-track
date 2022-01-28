import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CoinContext } from './CoinContext';

ReactDOM.render(
  <React.StrictMode>
    <CoinContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CoinContext>
  </React.StrictMode>,
  document.getElementById('root')
);
