import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjK3uJR2VpaB-LwEWUxMUcSSEJgUii6WQ",
  authDomain: "mindmyplants-13834.firebaseapp.com",
  projectId: "mindmyplants-13834",
  storageBucket: "mindmyplants-13834.firebasestorage.app",
  messagingSenderId: "124948728835",
  appId: "1:124948728835:web:85c8e9cdc8e3b57ff75236",
  measurementId: "G-PRFTMSL96K",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
