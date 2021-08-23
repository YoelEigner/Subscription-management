import firebase from 'firebase'
import "firebase/auth";

export const apiKey = "AIzaSyCF-JTOLv5CJIl6WdwXnByLnqQp9ViHSFg"
export const authDomain = "movies2-577c9.firebaseapp.com"
export const appAuth = firebase.initializeApp({
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: "movies2-577c9",
  storageBucket: "movies2-577c9.appspot.com",
  messagingSenderId: "955436687952",
  appId: "1:955436687952:web:8abbf7d48bd81e888f6755",
  measurementId: "G-50KD91NQBF"

});