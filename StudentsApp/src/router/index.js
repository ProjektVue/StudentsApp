import Vue from "vue";
import VueRouter from "vue-router"
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";

import {auth} from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "register",
    component: Register
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {requestAuth: true}
  }
]

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;
