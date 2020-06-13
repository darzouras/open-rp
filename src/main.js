import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import * as firebase from 'firebase'
import store from './store'

Vue.use(VueRouter)

Vue.config.productionTip = false

import Main from './components/Main.vue';
import Components from './components/Components.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
// import Dashboard from './components/Dashboard.vue';

const routes = [
  { path: '/', name: 'main', component: Main },
  { path: '/components', name: 'components', component: Components },
  { path: '/login', name: 'login', component: Login},
  { path: '/register', name: 'register', component: Register},
  // { path: '/dashboard', name: 'dashboard', component: Dashboard}
]

const router = new VueRouter({
  routes
})

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
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')