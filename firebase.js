// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZqNqBF7RWAwb-vAtCbnKFtcY2L9MDhWk",
  authDomain: "flashcardsaas-cc489.firebaseapp.com",
  projectId: "flashcardsaas-cc489",
  storageBucket: "flashcardsaas-cc489.appspot.com",
  messagingSenderId: "622775861220",
  appId: "1:622775861220:web:0b2e2d01250185f50591f1",
  measurementId: "G-SEP01X2HR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const firestore = getFirestore();
//const analytics = getAnalytics(app);
export default db;
export{db};
//export{firestore};