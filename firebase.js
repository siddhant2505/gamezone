import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyChytQe9qbXNXFHnsA46RYyCN90dA-78JY",
  authDomain: "newgamezone-e6997.firebaseapp.com",
  projectId: "newgamezone-e6997",
  storageBucket: "newgamezone-e6997.appspot.com",
  messagingSenderId: "506294539723",
  appId: "1:506294539723:web:2013002a3c79345079924e",
  measurementId: "G-Q7K85ZR2Q6"
  // Your Firebase configuration here
};

firebase.initializeApp(firebaseConfig);

// Create a Google authentication provider
const provider = new firebase.auth.GoogleAuthProvider();

// Export the Firebase authentication module and Google provider
export const auth = firebase.auth();
const db = firebase.firestore();

export {db,provider}