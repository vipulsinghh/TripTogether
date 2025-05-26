"use client";

import { createContext, useContext, ReactNode } from 'react';
import { initializeApp, FirebaseApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';


// Your Firebase config - Replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyD8gc0-BE1WB883k27AQKEGJMw9YsNgdUs",
  authDomain: "roammate-f79b6.firebaseapp.com",
  projectId: "roammate-f79b6",
  storageBucket: "roammate-f79b6.firebasestorage.app",
  messagingSenderId: "25317106431",
  appId: "1:25317106431:web:4beb31e0f1e097fc5222ca",
  measurementId: "G-GV9LM64HY3"
};


interface FirebaseContextProps {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  // Initialize Firebase only once
  let app: FirebaseApp;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  const auth = getAuth(app);
  const db = getFirestore(app);

  return (
    <FirebaseContext.Provider value={{ app, auth, db }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};