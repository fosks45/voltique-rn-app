// import { initializeApp } from 'firebase/app';
const firebase = require('firebase');

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPO89PJzlSmt6v1GEUvXQ7TU27bXHbiOk",
  authDomain: "volt1-f748c.firebaseapp.com",
  projectId: "volt1-f748c",
  storageBucket: "volt1-f748c.appspot.com",
  messagingSenderId: "154022801014",
  appId: "1:154022801014:web:8209495b356175c2e8f957",
  measurementId: "G-3EY3HDTRHH"
};

// Initialize Firebase
// Initialize Firebase
const app = firebase(firebaseConfig);

db.collection('organisations').doc('5bVqKwgaN5pF81YTQiAP').collection('asset_groups').doc('3C0Qa9qUGIWaJsbXGAKC').collection('assets')
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
      });
 })