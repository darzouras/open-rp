import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from './firebase'

Vue.use(VueRouter)

import Main from './routes/Main.vue';
import Components from './routes/Components.vue';
import Login from './routes/Login.vue';
import Register from './routes/Register.vue';
import Dashboard from './routes/Dashboard.vue';
import Roadmap from './routes/Roadmap.vue';
import User from './routes/User.vue';
import NewCharacter from './routes/NewCharacter.vue';

const routes = [
  { path: '/', name: 'main', component: Main },
  { path: '/components', name: 'components', component: Components },
  { path: '/roadmap', name: 'roadmap', component: Roadmap},

  { path: '/user/:user', name: 'User', component: User},

  { path: '/login', name: 'login', component: Login, meta: {noAuth: true}},
  { path: '/register', name: 'register', component: Register, meta: {noAuth: true}},

  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: {requiresAuth: true}},
  { path: '/new-character', name: 'new-character', component: NewCharacter, meta: {requiresAuth: true}}
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const noAuth = to.matched.some(record => record.meta.noAuth);
  if (requiresAuth && !await firebase.getCurrentUser()) {
    next('login')
  } else if (noAuth && await firebase.getCurrentUser()) {
    next('dashboard')
  }
  else {
    next()
  }
})

export default router;