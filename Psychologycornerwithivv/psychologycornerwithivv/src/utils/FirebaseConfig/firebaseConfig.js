// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { fireStoreConfig } from "../../../env.js";
const firebaseConfig = {
  apiKey: fireStoreConfig.FIREBASE_API_KEY,
  authDomain: fireStoreConfig.FIREBASE_AUTH_DOMAIN,
  databaseURL: fireStoreConfig.FIREBASE_DATABASE_URL,
  projectId: fireStoreConfig.FIREBASE_PROJECT_ID,
  storageBucket: fireStoreConfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: fireStoreConfig.FIREBASE_MESSAGING_SENDER_ID,
  appId: fireStoreConfig.FIREBASE_APP_ID,
  measurementId: fireStoreConfig.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, db, auth };
