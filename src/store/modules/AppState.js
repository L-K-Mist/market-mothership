const state = {
    hasStall: false
}

const getters = {
    hasStall(state) {
        return state.hasStall
    }
}

const mutations = {
    hasStall(state, payload) {
        state.hasStall = payload
    }
}

const actions = {

}

export default {
    state, getters, actions
}