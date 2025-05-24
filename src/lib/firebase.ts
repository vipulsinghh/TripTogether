// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore"; // Import getFirestore
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8gc0-BE1WB883k27AQKEGJMw9YsNgdUs",
  authDomain: "roammate-f79b6.firebaseapp.com",
  projectId: "roammate-f79b6",
  storageBucket: "roammate-f79b6.firebasestorage.app",
  messagingSenderId: "25317106431",
  appId: "1:25317106431:web:4beb31e0f1e097fc5222ca",
  measurementId: "G-GV9LM64HY3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
export const auth = getAuth(app);

// Initialize and get Firestore instance
export const db = getFirestore(app); // Initialize and export db

// Get Firebase Analytics instance (optional)
// const analytics = getAnalytics(app);