import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Base from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; //Подключение "Bootstrap"
import './App.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Base />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
