import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {InMemoryApp} from "./InMemoryApp";
import firebase from "firebase/compat";

const initialData = []

const firebaseConfig = {
    apiKey: "AIzaSyCcQ6XCOvMIA7pHME4bWBgy_7OVy_7XErA",
    authDomain: "cs124-fall2021.firebaseapp.com",
    projectId: "cs124-fall2021",
    storageBucket: "cs124-fall2021.appspot.com",
    messagingSenderId: "264318304667",
    appId: "1:264318304667:web:4be8d27a02811b1ccd613e"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collectionName = "carmenBen-hmc-tasks";
const collection = db.collection(collectionName);

ReactDOM.render(
  <React.StrictMode>
      <InMemoryApp initialData={initialData} collection={collection}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
