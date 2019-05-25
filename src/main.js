import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import extractFirstLetter from './filters/extractFirstLetter'

Vue.filter('extractFirstLetter', extractFirstLetter);

Vue.config.productionTip = false
let app='';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDTcC_WQQxQuxy8vxs6YFijAXGAz7Rxf74",
  authDomain: "venta-automoviles.firebaseapp.com",
  databaseURL: "https://venta-automoviles.firebaseio.com",
  projectId: "venta-automoviles",
  storageBucket: "venta-automoviles.appspot.com",
  messagingSenderId: "571084213922",
  appId: "1:571084213922:web:8c144aa1155490ce"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() =>{
  if(!app){
    app=new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});
