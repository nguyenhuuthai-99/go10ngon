// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx_5yNTqqhgybYm56CDltVI8jFLcM32m0",
  authDomain: "go10ngon.firebaseapp.com",
  projectId: "go10ngon",
  storageBucket: "go10ngon.firebasestorage.app",
  messagingSenderId: "236585090787",
  appId: "1:236585090787:web:ed00cd6c602e6658634fd6",
  measurementId: "G-G58FJN3YVL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
