import 'babel-polyfill';
import 'airbnb-browser-shims';

import 'sanitize.css/sanitize.css';

import { BrowserRouter } from "react-router-dom";

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// global styles
import './style.scss';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);