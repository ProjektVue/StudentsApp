import firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBw-8sQrmY4_ZiQ9SFD3jt-qgKwpD-3Rz0",
  authDomain: "studentapp-5e077.firebaseapp.com",
  databaseURL: "https://studentapp-5e077.firebaseio.com",
  projectId: "studentapp-5e077",
  storageBucket: "studentapp-5e077.appspot.com",
  messagingSenderId: "462180078687",
  appId: "1:462180078687:web:0dbf636f843e68d9f637ea",
};

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

const usersCollection = db.collection("users");
const eventsCollection = db.collection("events");
const conversationsCollection = db.collection("conversations");

export {
  db,
  auth,
  currentUser,
  usersCollection,
  conversationsCollection,
  eventsCollection,
};
