import {initializeApp} from 'firebase';

const firebaseConf = initializeApp({
  apiKey: "AIzaSyC-AtsL8WYnmEgblYJhnDHo0Coy20TIJ1M",
  authDomain: "fir-vue-c8563.firebaseapp.com",
  databaseURL: "https://fir-vue-c8563.firebaseio.com",
  projectId: "fir-vue-c8563",
  storageBucket: "fir-vue-c8563.appspot.com",
  messagingSenderId: "786385791981",
  appId: "1:786385791981:web:15c8ff341bdf369f59d5e4"
})

const auth = firebaseConf.auth()
const db = firebaseConf.firestore()

const eventsCollection = db.collection('events')
const friendsCollection = db.collection('friends')

const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

export {
  auth,
  eventsCollection,
  friendsCollection
}
