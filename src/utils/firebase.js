import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDbZkznMLhM6mZhRZZiWvjlTKJPiBa6108",
  authDomain: "quiz-app-9e2e3.firebaseapp.com",
  databaseURL: "https://quiz-app-9e2e3-default-rtdb.firebaseio.com",
  projectId: "quiz-app-9e2e3",
  storageBucket: "quiz-app-9e2e3.appspot.com",
  messagingSenderId: "561968582597",
  appId: "1:561968582597:web:3d13adfab380c81d8a85ac"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Firebase authentication object
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
googleProvider.addScope('profile');
googleProvider.addScope('email');

const auth = firebase.auth()
const db = firebase.firestore();
export {firebase, auth, db, googleProvider};
