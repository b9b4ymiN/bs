// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByNpKtYQHHHpNtylYURYVrwUB-fFayYvY",
  authDomain: "bstock-8d4cd.firebaseapp.com",
  databaseURL: "https://bstock-8d4cd-default-rtdb.firebaseio.com",
  projectId: "bstock-8d4cd",
  storageBucket: "bstock-8d4cd.appspot.com",
  messagingSenderId: "50475280652",
  appId: "1:50475280652:web:77401341af190464e10129"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

 