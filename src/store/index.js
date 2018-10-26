import Vue from 'vue'
import Vuex from 'vuex'
import AppState from './AppState'
import MarketsMap from './modules/MarketsMap'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['MarketsMap']
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppState,
    MarketsMap
  },
  plugins: [vuexLocal.plugin]
})

export default store