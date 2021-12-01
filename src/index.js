import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {InMemoryApp} from "./InMemoryApp";
import firebase from "firebase/compat";
import './index.css';
import reportWebVitals from './reportWebVitals';
// import { Social } fro /m './components/Social'

const initialData = []

const firebaseConfig = {
    apiKey: "AIzaSyCd9qqxvMpEKpBzwfWcc2tlRFa6ICaLH_s",
    authDomain: "hmc-cs124-fa21-labs.firebaseapp.com",
    projectId: "hmc-cs124-fa21-labs",
    storageBucket: "hmc-cs124-fa21-labs.appspot.com",
    messagingSenderId: "949410042946",
    appId: "1:949410042946:web:0113b139a7e3cd1cc709db"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collectionName = "carmenBen-hmc-tasks";
const collection = db.collection(collectionName);

let startApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <InMemoryApp initialData={initialData} collection={collection}>
                {/*<Social>*/}
                {/*</Social>*/}
            </InMemoryApp>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

if(!window.cordova) {
    startApp()
} else {
    document.addEventListener('deviceready', startApp, false)
}

reportWebVitals();

