import firebase from 'firebase'

 var config = {
    apiKey: "AIzaSyCSxy9K_0KqVeuL_5ITJfjE7QqsglvSo5E",
    authDomain: "parking-book.firebaseapp.com",
    databaseURL: "https://parking-book.firebaseio.com",
    projectId: "parking-book",
    storageBucket: "",
    messagingSenderId: "1081796034664"
  };
  firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const userRef = firebase.database().ref('users');
export const locationsRef = firebase.database().ref('location');
export const insert = firebase.database();