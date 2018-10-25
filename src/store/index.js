import Vue from 'vue'
import Vuex from 'vuex'
import AppState from './AppState'
import MarketsMap from './modules/MarketsMap'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppState,
    MarketsMap
  }
})

export default store