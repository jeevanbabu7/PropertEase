// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "propertease-394e2.firebaseapp.com",
  projectId: "propertease-394e2",
  storageBucket: "propertease-394e2.appspot.com",
  messagingSenderId: "275314186615",
  appId: "1:275314186615:web:4f5ae39f336aba1a21a972",
  measurementId: "G-7GB2JE7B4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;