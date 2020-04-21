import Vue from 'vue'
import App from "./App";
import router from './router';
import store from "./store";
import {auth} from "./firebase";
Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    new Vue({
      router,
      store,
      el: '#app',
      render: h => h(App)
    }).$mount("#app")
  }
})
