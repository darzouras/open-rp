import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    activeChar: String,
    allChars: []
  },
  getters: {
    user(state){
      return state.user
    },
    activeChar(state){
      return state.activeChar
    },
    allChars(state) {
      return state.allChars
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    setChar(state, data) {
      state.activeChar = data
    },
    setAllChars(state, data) {
      state.allChars = data
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
});