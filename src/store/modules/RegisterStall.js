const state = {
    showRegisterStall: false,
        stepState: null
}

const getters = {
    showRegisterStall(state){
    return state.showRegisterStall
    },
        stepState(state){
    return state.stepState
    }
}

const mutations = {
    showRegisterStall(state, payload) {
        state.showRegisterStall = payload
    },
    stepState(state, payload) {
    state.stepState = payload
    console.log('TCL: ----------------------------------------------------');
    console.log('TCL: stepState -> state.stepState ', state.stepState );
    console.log('TCL: ----------------------------------------------------');
    }
}

const actions = {
  showRegisterStall({
      state, commit
  }, payload) {
      commit('showRegisterStall', payload)
  },
  stepState({
      state, commit
  }, payload) {
      commit('stepState', payload)
  }
};

export default {
    state,
    getters,
    mutations,
    actions
}