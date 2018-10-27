const state = {
    showRegisterStall: true
}

const getters = {
    showRegisterStall(state){
return state.showRegisterStall
    }
}

const mutations = {
    showRegisterStall(state, payload) {
        state.showRegisterStall = payload
    }
}

const actions = {
  showRegisterStall({
      state, commit
  }, payload) {
      commit('showRegisterStall', payload)
  }
};

export default {
    state,
    getters,
    mutations,
    actions
}