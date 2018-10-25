import Vue from 'vue'
import Vuex from 'vuex'
import AppState from './AppState'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppState
  }
})

export default store
