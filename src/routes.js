import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from './firebase'

Vue.use(VueRouter)

import Main from './routes/Main.vue';
import Components from './routes/Components.vue';
import Login from './routes/Login.vue';
import Register from './routes/Register.vue';
import ForgotPassword from './routes/ForgotPassword.vue';
import Dashboard from './routes/Dashboard.vue';
import UpdateProfile from './routes/UpdateProfile.vue';
import UpdatePassword from './routes/UpdatePassword.vue';
import UpdateEmail from './routes/UpdateEmail.vue';
import Roadmap from './routes/Roadmap.vue';
import User from './routes/User.vue';
import NewCharacter from './routes/NewCharacter.vue';
import Character from './routes/Character.vue';
import CharUpdate from './routes/CharUpdate.vue';
import CharOpen from './routes/CharOpen.vue';
import Thread from './routes/Thread.vue';
import NotFound from './routes/404.vue';

const routes = [
  { path: '/', name: 'main', component: Main },
  { path: '/components', name: 'components', component: Components },
  { path: '/roadmap', name: 'roadmap', component: Roadmap},
  { path: '/404', name: '404', component: NotFound},

  { path: '/user/:user', name: 'user', component: User},
  { path: '/char/:char', name: 'character', component: Character},
  { path: '/char/:char/open', name: 'open', component: CharOpen},
  { path: '/char/:char/open/:thread', name: 'thread', component: Thread},

  { path: '/login', name: 'login', component: Login, meta: {noAuth: true}},
  { path: '/register', name: 'register', component: Register, meta: {noAuth: true}},
  { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword, meta: {noAuth: true}},

  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: {requiresAuth: true}},
  { path: '/update-profile', name: 'update-profile', component: UpdateProfile, meta: {requiresAuth: true}},
  { path: '/update-password', name: 'update-password', component: UpdatePassword, meta: {requiresAuth: true}},
  { path: '/update-email', name: 'update-email', component: UpdateEmail, meta: {requiresAuth: true}},
  { path: '/new-character', name: 'new-character', component: NewCharacter, meta: {requiresAuth: true}},
  { path: '/update-character/:char', name: 'update-character', component: CharUpdate, meta: {requiresAuth: true}}
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