import apollo from "@/apollo";
import gql from "graphql-tag";

const state = {
    hasStall: false,
    activeUser: null
}

const getters = {
    hasStall(state) {
        return state.hasStall
    },
        activeUser(state) {
        return state.activeUser
    }
}

const mutations = {
    hasStall(state, payload) {
        state.hasStall = payload
    }
}

const actions = {
    activeUser({
        state
    }, payload){
        state.activeUser = {
            ...payload.user,
            token: payload.token
            
        }
        console.log("​state.activeUser", state.activeUser)

        console.log("​----------------------------------")

        console.log("​----------------------------------")

    },
    async fetchMyStall({
        state
    }) {
        const response = await apollo.query({ query: gql`
            query myStall {
              myStall {
                id
                name
                description
                image
                w3w
              }
            }
          `
        });
        console.log("​------------------")
        console.log("​response", response)
        console.log("​------------------")
        
    }
}

export default {
    state, getters, mutations, actions
}