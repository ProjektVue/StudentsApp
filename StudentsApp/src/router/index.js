import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";

import {auth} from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requestAuth);
  const isAuthenticated = auth.currentUser;
  console.log("isAuthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/home");
  } else {
    next();
  }
});

export default router;
