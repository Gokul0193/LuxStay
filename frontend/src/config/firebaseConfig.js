import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyATlYWEKp5k77D16NfwieAfGDwy9nW8i8w",
  authDomain: "staylux-a71c8.firebaseapp.com",
  projectId: "staylux-a71c8",
  storageBucket: "staylux-a71c8.firebasestorage.app",
  messagingSenderId: "419091435834",
  appId: "1:419091435834:web:552f32165c84f5cff74003"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app)
export const googleProvider=new GoogleAuthProvider();