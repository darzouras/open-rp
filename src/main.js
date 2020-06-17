import Vue from 'vue'
import App from './App.vue'
import firebase from './firebase'
import db from './firebase'
import store from './store'
import router from './routes'
import Vue2Filters from 'vue2-filters'
import VueFirestore from 'vue-firestore'

Vue.use(VueFirestore)
Vue.use(Vue2Filters)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  db,
  firebase
}).$mount('#app')