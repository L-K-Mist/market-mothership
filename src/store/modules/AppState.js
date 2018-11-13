import apollo from "@/apollo.js";
import gql from "graphql-tag";


// TODO: Gotta still improve general log-in functionality.
const state = {
    hasStall: false,
    activeUser: null,
    error: null,
    stallHolder: null
}

const getters = {
    hasStall(state) {
        return state.hasStall
    },
    activeUser(state) {
        return state.activeUser
    },
    error(state) {
        return state.error
    },
    stallHolder(state) {
        return state.stallHolder
    }
}

const mutations = {
    hasStall(state, payload) {
        state.hasStall = payload
    },

    stallHolder(state, payload) {
        state.stallHolder = payload
        console.log('TCL: commit -> state.stallHolder', state.stallHolder);
    }
}

const actions = {
    activeUser({
        state
    }, payload) {
        state.activeUser = {
            ...payload.user,
            token: payload.token

        }
        console.log("​state.activeUser", state.activeUser)

        console.log("​----------------------------------")

        console.log("​----------------------------------")

    },
    async fetchMyStall({
        state,
        commit
    }) {
        state.error = null
        try {
            const response = await apollo.query({
                query: gql `
                query myStall {
                  myStall {
                    id
                    name
                    description
                    image
                    w3w
                    lat
                    lng
                  }
                }
              `
            });
            console.log("​------------------")
            console.log("​response", response.data.myStall)
            console.log("​------------------")
            commit('stall', response.data.myStall)

            return

        } catch (err) {
            state.error = err
            alert(err)
        }

    },
    error({
        state
    }, payload) {
        state.error = payload
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}