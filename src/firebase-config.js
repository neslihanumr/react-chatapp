// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0omQixUQaYrFNGF0RX5VsJt3IhM6TuxA",
  authDomain: "chatapp-e88f9.firebaseapp.com",
  projectId: "chatapp-e88f9",
  storageBucket: "chatapp-e88f9.appspot.com",
  messagingSenderId: "952956756865",
  appId: "1:952956756865:web:452cd0f34e2d8fa42e3e80",
  measurementId: "G-ECX9FJD2W1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
