// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn8ZGK1mEvsB933u5QarVVQXe9Ql5gv2Q",
  authDomain: "login-auth-d2acf.firebaseapp.com",
  projectId: "login-auth-d2acf",
  storageBucket: "login-auth-d2acf.firebasestorage.app",
  messagingSenderId: "19044173047",
  appId: "1:19044173047:web:22d2509bb162427de9fff2"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;