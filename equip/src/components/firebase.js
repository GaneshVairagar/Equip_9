// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClFhDwwTP_fai-ACLQ2dBmVVLKqaOjPAM",
  authDomain: "equip9-8ffbf.firebaseapp.com",
  projectId: "equip9-8ffbf",
  storageBucket: "equip9-8ffbf.firebasestorage.app",
  messagingSenderId: "966807752071",
  appId: "1:966807752071:web:27bd3566ec9bb249c25722"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;