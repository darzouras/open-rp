import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

import Main from './components/Main.vue';
import Components from './components/Components.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/components', component: Components }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')