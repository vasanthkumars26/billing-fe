import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBz0OpoVeImYl5bEjK88jMv5rof5HvKFDw",
  authDomain: "billing-invoice-fe6fb.firebaseapp.com",
  projectId: "billing-invoice-fe6fb",
  storageBucket: "billing-invoice-fe6fb.appspot.com",
  messagingSenderId: "841585469791",
  appId: "1:841585469791:web:34095ab9a97ed526a5aeea",
  measurementId: "G-J0PW1J9LH7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();