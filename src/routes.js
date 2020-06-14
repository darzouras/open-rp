import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Main from './routes/Main.vue';
import Components from './routes/Components.vue';
import Login from './routes/Login.vue';
import Register from './routes/Register.vue';
import Dashboard from './routes/Dashboard.vue';
import Roadmap from './routes/Roadmap.vue';

import NewCharacter from './routes/NewCharacter.vue';

const routes = [
  { path: '/', name: 'main', component: Main },
  { path: '/components', name: 'components', component: Components },
  { path: '/login', name: 'login', component: Login},
  { path: '/register', name: 'register', component: Register},
  { path: '/dashboard', name: 'dashboard', component: Dashboard},
  { path: '/roadmap', name: 'roadmap', component: Roadmap},

  { path: '/new-character', name: 'new-character', component: NewCharacter}
]

const router = new VueRouter({
  routes
})

export default router;