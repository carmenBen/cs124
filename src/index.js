import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {InMemoryApp} from "./InMemoryApp";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

const initialData = [
    {
        title: "Buy new John Grisham book ",
        id: generateUniqueID(),
        completed: false
    },
    {
        title: "Call Mom ",
        id: generateUniqueID(),
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
