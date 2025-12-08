// Firebase v9+ Modular SDK Setup

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/*
  IMPORTANT:
  Replace the firebaseConfig object below with YOUR project credentials
  from Firebase Console → Project Settings → General → SDK Setup
*/

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MSG_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
