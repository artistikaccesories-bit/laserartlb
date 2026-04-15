import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, addDoc, getDocs,
  query, orderBy, limit, Timestamp, onSnapshot,
  doc, updateDoc, deleteDoc, setDoc, getDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: any;
let db: any = null;
let storage: any = null;

try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
  } else {
    console.warn("Firebase config missing.");
  }
} catch (error) {
  console.error("Firebase init error", error);
}

export {
  db, storage, collection, addDoc, getDocs, query, orderBy,
  limit, Timestamp, onSnapshot, doc, updateDoc, deleteDoc, setDoc, getDoc,
  ref, uploadBytes, getDownloadURL
};
