import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import Login from "@/components/Login";
import CreateEvent from "@/components/CreateEvent";
import Dashboard from "@/components/Dashboard";
import Users from "@/components/Users";
import Chat from "@/components/Chat";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.NODE_ENV === "production" ? "/StudentsApp/" : "/",
  routes: [
    {
      path: "*",
      redirect: "/dashboard",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/create_event",
      name: "CreateEvent",
      component: CreateEvent,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/users",
      name: "Users",
      component: Users,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/chat",
      name: "Chat",
      component: Chat,
      meta: {
        requiresAuth: true,
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
