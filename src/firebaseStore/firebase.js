// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBy9I1fq03m_qSk6GdR7cqUyFW6Hb0EBo8",
  authDomain: "e-commerce-app-c10de.firebaseapp.com",
  projectId: "e-commerce-app-c10de",
  storageBucket: "e-commerce-app-c10de.appspot.com",
  messagingSenderId: "214763311792",
  appId: "1:214763311792:web:a22482a71dc3df56a22175",
  measurementId: "G-JKC93SFE1N",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore(app);

export { auth, db };
