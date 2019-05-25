import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fullNameUser:null
  },
  mutations: {
    toAssignFullName(state, name){
      state.fullNameUser=name;
    }
  },
  actions: {
    socialLogin({commit}) {
      const provider= new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider
      ).then(response=>{
        const currentUser = response.user;
        let name=currentUser.providerData[0].displayName;
        if(!name) name=currentUser.providerData[0].email;
        commit('toAssignFullName', name);
        router.replace('home');
      }, err=>{
        alert('No hay ningún registro de usuario correspondiente a e-mail. El usuario puede haber sido eliminado.');
      });
    },
    signUp: function ({commit},credentials) {
      firebase.auth().createUserWithEmailAndPassword(credentials[0], credentials[1]
      ).then(response => {
        console.log(response);
        const currentUser = response.user;
        let name=currentUser.providerData[0].displayName;
        if(!name) name=currentUser.providerData[0].email;
        commit('toAssignFullName', name);
        router.replace('home');
      }, err => {
        alert('La dirección de correo electrónico ya está en uso por otra cuenta.');
      });
    },
    auth: function ({commit}, credentials) {
      firebase.auth().signInWithEmailAndPassword(credentials[0], credentials[1]
      ).then(response=>{
        const currentUser = response.user;
        let name=currentUser.providerData[0].displayName;
        if(!name) name=currentUser.providerData[0].email;
        commit('toAssignFullName', name);
        router.replace('home');
      }, err=>{
        alert('No hay ningún registro de usuario correspondiente a e-mail. El usuario puede haber sido eliminado.');
      });
    },
    logout({commit}) {
      firebase.auth().signOut().then(() => {
        router.replace('login');
        commit('toAssignFullName', null);
      })
    },
    loggedIn({commit}){
      const currentUser = firebase.auth().currentUser;
      if(currentUser) {
        let name=currentUser.providerData[0].displayName;
        if(!name) name=currentUser.providerData[0].email;
        commit('toAssignFullName', name);
      } else {
        commit('toAssignFullName', null);
      }
    }
  }
})
