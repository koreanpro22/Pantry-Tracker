// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_9QQqWPqz0P7zdrxnBGLbsjosSGi6mwY",
  authDomain: "pantry-tracker-e965b.firebaseapp.com",
  projectId: "pantry-tracker-e965b",
  storageBucket: "pantry-tracker-e965b.appspot.com",
  messagingSenderId: "474264129144",
  appId: "1:474264129144:web:19c7eec620baf20143e78d",
  measurementId: "G-8V27HN5WJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore };