import Vue from "vue";
import Router from "vue-router";
import firebase from 'firebase';
import Home from "./views/Home.vue";
import Prueba from "./views/Prueba.vue";
import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import MisPublicaciones from "./views/MisPublicaciones.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/prueba",
      name: "prueba",
      component: Prueba
    }, {
      path: "/mis-publicaciones",
      name: "MisPublicaciones",
      component: MisPublicaciones
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        // requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        isLogin: true
      }
    },
    {
      path: "/sign-up",
      name: "signUp",
      component: SignUp,
      meta: {
        isLogin: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
   const currentUser = firebase.auth().currentUser;
   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
   const isLogin = to.matched.some(record => record.meta.isLogin);
   if(requiresAuth && !currentUser) next('login');
   else if (isLogin && currentUser) next('home');
   else next();
});

export default router;