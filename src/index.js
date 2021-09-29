import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {InMemoryApp} from "./InMemoryApp";

const initialData = [
    {
        title: "Buy new John Grisham book ",
        id: Math.random() * 1000,
        completed: false
    },
    {
        title: "Call Mom ",
        id: Math.random() * 1000,
        completed: true
    }
]

ReactDOM.render(
  <React.StrictMode>
      <InMemoryApp initialData={initialData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
