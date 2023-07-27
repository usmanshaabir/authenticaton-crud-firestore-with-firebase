// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAvg4V719f6YeFuDXDrVWWe9-5mMtmXAEk",
  authDomain: "ecommerce-app-966b3.firebaseapp.com",
  projectId: "ecommerce-app-966b3",
  storageBucket: "ecommerce-app-966b3.appspot.com",
  messagingSenderId: "815941853830",
  appId: "1:815941853830:web:2ded2a876c317b2145e707",
  measurementId: "G-RGQT9R1VD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firebase = getFirestore(app)
const storage = getStorage(app)

export { analytics, auth, firebase, storage }