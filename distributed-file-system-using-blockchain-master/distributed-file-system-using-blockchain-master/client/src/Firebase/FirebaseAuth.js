import { initializeApp } from "firebase/app";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {createUserwithEmailandPassword, signInwithEmailandPassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8YjdvJpFOUy39mzIBgvDDg_3OULTsRBE",
  authDomain: "login-form-database-20ae7.firebaseapp.com",
  projectId: "login-form-database-20ae7",
  storageBucket: "login-form-database-20ae7.firebasestorage.app",
  messagingSenderId: "920683304733",
  appId: "1:920683304733:web:ad3d51032eeb6feeec73f4",
  measurementId: "G-MKBNE9DPL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const Auth = getAuth();
export const db = getFirestore(app);
export default app;
