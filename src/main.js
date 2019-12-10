import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import 'firebase/firestore'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import extractFirstLetter from './filters/extractFirstLetter'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBcoac5fsvm1Xm_opMMLtOLNZTNGsVilGE',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
  // installComponents: false,
});

Vue.component('google-map', VueGoogleMaps.Map);
Vue.component('google-marker', VueGoogleMaps.Marker);
Vue.filter('extractFirstLetter', extractFirstLetter);

Vue.config.productionTip = false;
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
export const db=firebase.firestore();
firebase.auth().onAuthStateChanged(() =>{
  if(!app){
    app=new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});
