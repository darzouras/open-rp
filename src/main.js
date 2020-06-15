import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import '@firebase/firestore'
import store from './store'
import router from './routes'
import VueFirestore from 'vue-firestore';

Vue.use(VueFirestore)

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCGcVHjRiLlOU-bU3e7HQT-0K14fg321n8",
  authDomain: "open-rp.firebaseapp.com",
  databaseURL: "https://open-rp.firebaseio.com",
  projectId: "open-rp",
  storageBucket: "open-rp.appspot.com",
  messagingSenderId: "978145205579",
  appId: "1:978145205579:web:dad546216f25386ce21cce",
  measurementId: "G-J6YKYRKYWY"
};
// Initialize Firebase
var firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

export const db = firebaseApp.firestore();

new Vue({
  render: h => h(App),
  router,
  store,
  db
}).$mount('#app')