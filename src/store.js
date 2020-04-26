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
  }
});

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    posts: [],
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
          for (let i = 0; i < 20; i++) {
            users.push({
              email: userData.email,
              name: userData.name,
              country: userData.country,
              city: userData.city,
            });
          }
        });
      });
      commit("setAllUsers", users);
    },
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setAllUsers(state, val) {
      if (val) {
        state.allUsers = val;
      } else {
        state.allUsers = [];
      }
    },
  },
});
