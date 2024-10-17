import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpca03WyFyPwpWoUQZlGoUd2d3hhijBS8",
  authDomain: "fruzoz.firebaseapp.com",
  projectId: "fruzoz",
  storageBucket: "fruzoz.appspot.com",
  messagingSenderId: "483733472971",
  appId: "1:483733472971:web:e0bd555b5b7da09e177d4e",
  measurementId: "G-484R9D0EBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };
