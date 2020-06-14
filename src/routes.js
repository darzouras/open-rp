import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Main from './components/Main.vue';
import Components from './components/Components.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Dashboard from './components/Dashboard.vue';
import Roadmap from './components/Roadmap.vue';

const routes = [
  { path: '/', name: 'main', component: Main },
  { path: '/components', name: 'components', component: Components },
  { path: '/login', name: 'login', component: Login},
  { path: '/register', name: 'register', component: Register},
  { path: '/dashboard', name: 'dashboard', component: Dashboard},
  { path: '/roadmap', name: 'roadmap', component: Roadmap}
]

const router = new VueRouter({
  routes
})

export default router;