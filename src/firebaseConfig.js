import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
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

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true,
};
db.settings(settings);

// firebase collections
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const eventsCollection = db.collection("events");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");
const conversationsCollection = db.collection("conversations");

export {
  db,
  auth,
  currentUser,
  usersCollection,
  conversationsCollection,
  postsCollection,
  eventsCollection,
  commentsCollection,
  likesCollection,
};
