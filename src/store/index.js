import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import AppState from './modules/AppState'
import MarketsMap from './modules/MarketsMap'
import RegisterStall from './modules/RegisterStall'
import Authentication from './modules/Authentication'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["MarketsMap", 'RegisterStall', 'AppState', 'Authentication']
});

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppState,
    MarketsMap,
    RegisterStall,
    Authentication
  },
  plugins: [vuexLocal.plugin]
})

export default store