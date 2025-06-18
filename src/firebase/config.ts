// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1nsiXLlPOMkqWcrhFecx8qErlicSLAMU",
  authDomain: "fitboard-1343a.firebaseapp.com",
  projectId: "fitboard-1343a",
  storageBucket: "fitboard-1343a.firebasestorage.app",
  messagingSenderId: "150344678410",
  appId: "1:150344678410:web:a95ea6522a97775b68b3f3",
  measurementId: "G-PYRZ532TLQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const db = getFirestore(app);