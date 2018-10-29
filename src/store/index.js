import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import AppState from './AppState'
import MarketsMap from './modules/MarketsMap'
import RegisterStall from './modules/RegisterStall'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["MarketsMap", 'RegisterStall']
});

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppState,
    MarketsMap,
    RegisterStall
  },
  plugins: [vuexLocal.plugin]
})

export default store