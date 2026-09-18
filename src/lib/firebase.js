// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWq9nGlYV8MyYtCp7VlEJTOPZNDvHSXvE",
  authDomain: "fir-crashcourse-67e22.firebaseapp.com",
  databaseURL: "https://fir-crashcourse-67e22-default-rtdb.firebaseio.com",
  projectId: "fir-crashcourse-67e22",
  storageBucket: "fir-crashcourse-67e22.firebasestorage.app",
  messagingSenderId: "914438860714",
  appId: "1:914438860714:web:42f6777cb665d7c084c5d3",
  measurementId: "G-KX2T1FJBDS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
