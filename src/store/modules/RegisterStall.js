/**
 * {
    * "given_name":"Dylan","family_name":"van den Bosch",
    * "nickname":"vandenbosch.dylan1","name":"Dylan van den Bosch",
    * "picture":"https://lh5.googleusercontent.com/-KDE0SmX8dbM/AAAAAAAAAAI/AAAAAAAABJ8/4DJUn3JY7IY/photo.jpg",
    * "gender":"male","locale":"en-GB",
    * "updated_at":"2018-10-29T04:33:56.639Z",
    * "iss":"https://welink.au.auth0.com/",
    * "sub":"google-oauth2|108754556378795682719",
    * "aud":"0SIaIds4btTC6nLkYiOFkj5nJUg4GhJx",
    * "iat":1540787636,
    * "exp":1540823636,
    * "at_hash":"tx_6wNxZqoo-4ksk8_ZkcA",
    * "nonce":"ULMcOrCYrYzVMs-XwpcUo3E-nvxlkmrD"
 * }
 */

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