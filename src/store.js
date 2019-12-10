import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fullNameUser:null,
    user:null,
  },
  mutations: {
    toAssignFullName(state, name){
      state.fullNameUser=name;
    },
    toAssignUser(state, user){
      state.user=user;
    }
  },
  actions: {
    socialLogin({commit}) {
      const provider= new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider
      ).then(response=>{
        const currentUser = {
          uid:response.user.uid,
          name:response.user.providerData[0].displayName,
          email:response.user.providerData[0].email,
        } ;
        if(!currentUser.name){
          commit('toAssignFullName', currentUser.email);
        } else {
          commit('toAssignFullName', currentUser.name);
        }
        commit('toAssignUser', currentUser);
        router.replace('home');
      }, err=>{
        alert('No hay ningún registro de usuario correspondiente a e-mail. El usuario puede haber sido eliminado.');
      });
    },
    signUp: function ({commit},credentials) {
      firebase.auth().createUserWithEmailAndPassword(credentials[0], credentials[1]
      ).then(response => {
        const currentUser = {
          uid:response.user.uid,
          name:response.user.providerData[0].displayName,
          email:response.user.providerData[0].email,
        } ;
        if(!currentUser.name){
          commit('toAssignFullName', currentUser.email);
        } else {
          commit('toAssignFullName', currentUser.name);
        }
        commit('toAssignUser', currentUser);
        router.replace('home');
      }, err => {
        alert('La dirección de correo electrónico ya está en uso por otra cuenta.');
      });
    },
    auth: function ({commit}, credentials) {
      firebase.auth().signInWithEmailAndPassword(credentials[0], credentials[1]
      ).then(response=>{
        const currentUser = {
          uid:response.user.uid,
          name:response.user.providerData[0].displayName,
          email:response.user.providerData[0].email,
        } ;
        if(!currentUser.name){
          commit('toAssignFullName', currentUser.email);
        } else {
          commit('toAssignFullName', currentUser.name);
        }
        commit('toAssignUser', currentUser);
        router.replace('home');
      }, err=>{
        alert('No hay ningún registro de usuario correspondiente a e-mail. El usuario puede haber sido eliminado.');
      });
    },
    logout({commit}) {
      firebase.auth().signOut().then(() => {
        router.replace('login');
        commit('toAssignFullName', null);
        commit('toAssignUser', null);
      })
    },
    loggedIn({commit}){
      const _currentUser = firebase.auth().currentUser;
      if(_currentUser) {
        const currentUser = {
          uid:_currentUser.uid,
          name:_currentUser.providerData[0].displayName,
          email:_currentUser.providerData[0].email,
        } ;
        if(!currentUser.name){
          commit('toAssignFullName', currentUser.email);
        } else {
          commit('toAssignFullName', currentUser.name);
        }
        commit('toAssignUser', currentUser);
      } else {
        commit('toAssignFullName', null);
      }
    }
  }
})
