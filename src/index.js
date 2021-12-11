import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {InMemoryApp} from "./InMemoryApp";
import firebase from "firebase/compat";

const initialData = []

const firebaseConfig = {
    apiKey: "AIzaSyDPKaTLMKCRxvZrUC0Mr-zhmIvgib-wo2w",
    authDomain: "cs124lab-86e6f.firebaseapp.com",
    projectId: "cs124lab-86e6f",
    storageBucket: "cs124lab-86e6f.appspot.com",
    messagingSenderId: "624846876574",
    appId: "1:624846876574:web:d46076bc03bef3f06ff08f",
    measurementId: "G-DNNRR8Y9S2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collectionName = "List-AuthenticationRequired";
const collection = db.collection(collectionName);
const auth = firebase.auth();

ReactDOM.render(
  <React.StrictMode>
      <InMemoryApp initialData={initialData} collection={collection} auth={auth}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
