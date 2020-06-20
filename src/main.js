import Vue from 'vue'
import App from './App.vue'
import firebase from './firebase'
import db from './firebase'
import store from './store'
import router from './routes'
import Vue2Filters from 'vue2-filters'
import VueFirestore from 'vue-firestore'
import 'remixicon/fonts/remixicon.css'
import VueSanitize from 'vue-sanitize'

Vue.use(VueFirestore)
Vue.use(Vue2Filters)

let defaults = {
  allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'abbr', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img', 'center', 'small' ],
  disallowedTagsMode: 'escape',
  allowedAttributes: {
    a: [ 'href', 'name', 'target' ],
    // We don't currently allow img itself by default, but this
    // would make sense if we did. You could add srcset here,
    // and if you do the URL is checked for safety
    img: [ 'src', 'alt' ],
    iframe: [ 'src', 'height', 'width', 'frameborder']
  },
  // Lots of these won't come up by default because we don't allow them
  selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
  // URL schemes we permit
  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
  allowedSchemes: [ 'http', 'https', 'ftp', 'mailto' ],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
  allowProtocolRelative: true,
  enforceHtmlBoundary: false
}

Vue.use(VueSanitize,defaults);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  db,
  firebase
}).$mount('#app')