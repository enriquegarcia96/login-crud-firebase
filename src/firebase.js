import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const  firebaseConfig = {
    apiKey: "AIzaSyASrJRRLAz870kL5780OZqXQ2TvhyxSO8c",
    authDomain: "login-crud-firebase-8097e.firebaseapp.com",
    projectId: "login-crud-firebase-8097e",
    storageBucket: "login-crud-firebase-8097e.appspot.com",
    messagingSenderId: "1063604280466",
    appId: "1:1063604280466:web:211ad9ebdb0153d9635a4b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth}