import Vue from "vue";
import Vuex from "vuex";
const fb = require("./firebaseConfig.js");

Vue.use(Vuex);

// handle page reload
fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("setCurrentUser", user);
    store.dispatch("fetchUserProfile");
    store.dispatch("fetchAllUsers");

    fb.usersCollection.doc(user.uid).onSnapshot((doc) => {
      console.log("user, profile", doc.data());
      store.commit("setUserProfile", doc.data());
    });

    store.dispatch("fetchEvents");
  }
});

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    events: [],
    hiddenPosts: [],
    allUsers: [],
  },
  actions: {
    clearData({ commit }) {
      commit("setCurrentUser", null);
      commit("setUserProfile", {});
      commit("setPosts", null);
      commit("setHiddenPosts", null);
    },
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then((res) => {
          commit("setUserProfile", res.data());
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchAllUsers({ commit, state }) {
      const users = [];
      fb.usersCollection.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const userData = doc.data();
          users.push({
            uid: doc.id,
            email: userData.email,
            name: userData.name,
            country: userData.country,
            city: userData.city,
            avatar: userData.avatar,
          });
        });
      });
      commit("setAllUsers", users);
    },
    fetchEvents({ commit, state }) {
      // realtime updates from our posts collection
      fb.eventsCollection.orderBy("date").onSnapshot((querySnapshot) => {
        let eventsArray = [];
        let numberOfEventsCreatedByUser = 0;
        querySnapshot.forEach((doc) => {
          let event = doc.data();
          event.id = doc.id;
          if (state.currentUser.uid === event.userId) {
            event.isCurrentUserEvent = true;
            numberOfEventsCreatedByUser++;
          }
          eventsArray.push(event);
        });
        commit("setNumberOfEventsCreatedByUser", numberOfEventsCreatedByUser);
        commit("setEvents", eventsArray);
      });
    },
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setEvents(state, val) {
      state.events = val;
    },
    setAllUsers(state, val) {
      if (val) {
        state.allUsers = val;
      } else {
        state.allUsers = [];
      }
    },
    setNumberOfEventsCreatedByUser(state, val) {
      state.userProfile.numberOfEventsCreatedByUser = val;
    },
  },
});
