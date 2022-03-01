
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBPO89PJzlSmt6v1GEUvXQ7TU27bXHbiOk",
  authDomain: "volt1-f748c.firebaseapp.com",
  projectId: "volt1-f748c",
  storageBucket: "volt1-f748c.appspot.com",
  messagingSenderId: "154022801014",
  appId: "1:154022801014:web:8209495b356175c2e8f957",
  measurementId: "G-3EY3HDTRHH"
});

export const db = getFirestore();