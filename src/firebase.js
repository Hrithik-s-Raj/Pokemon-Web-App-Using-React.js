// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBE6B_IvBzWgiO0zvqo0bDGejXupIqr0Tk",
  authDomain: "pokemonapp-38abc.firebaseapp.com",
  projectId: "pokemonapp-38abc",
  storageBucket: "pokemonapp-38abc.appspot.com",
  messagingSenderId: "797252774684",
  appId: "1:797252774684:web:5ece1cbf18d377f8b868d9",
  measurementId: "G-152XZ5CKFK",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
