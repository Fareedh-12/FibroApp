// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // If using Firestore
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2iFyXrf4RQnt5DbOi4UMZ4kGp62UafJs",
  authDomain: "fibrotrack-32236.firebaseapp.com",
  projectId: "fibrotrack-32236",
  storageBucket: "fibrotrack-32236.appspot.com",
  messagingSenderId: "334069193600",
  appId: "1:334069193600:web:334caeb94fb26ce35e7f65",
  measurementId: "G-4FQ428JP0Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances for Firebase services
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
