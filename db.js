// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOz-2cCiu3DXxP5il7oW3E1LeXagHMICY",
  authDomain: "weir-6a08c.firebaseapp.com",
  projectId: "weir-6a08c",
  storageBucket: "weir-6a08c.appspot.com",
  messagingSenderId: "754994195633",
  appId: "1:754994195633:web:2eb260ccd24a645bbe8690",
  measurementId: "G-CQ7WBL9BLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export default db;