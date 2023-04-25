// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth,
  onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut,
  createUserWithEmailAndPassword, signInWithEmailAndPassword
 } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//
import { 
  getFirestore, collection, addDoc, getDocs, 
  doc, onSnapshot ,
  deleteDoc, updateDoc,
  query, where, orderBy
} from "firebase/firestore";

//스토리지(사진)
import { ref, getStorage, uploadString, getDownloadURL, deleteObject } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut,
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  db, collection, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, query, where, orderBy,
  ref, storage, getStorage, uploadString, getDownloadURL, deleteObject
}