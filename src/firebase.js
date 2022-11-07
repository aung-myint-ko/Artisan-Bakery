// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1HJ7MPJIAb6ztBnS1rxzvVPp8q4KXrCY",
  authDomain: "artisan-bakery-f0e4e.firebaseapp.com",
  projectId: "artisan-bakery-f0e4e",
  storageBucket: "artisan-bakery-f0e4e.appspot.com",
  messagingSenderId: "933033651374",
  appId: "1:933033651374:web:f66b90b9b656e35b94113f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

// apiKey: process.env.APIKEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
