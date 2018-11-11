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

import apollo from '@/apollo'
import gql from 'graphql-tag'


const state = {
    showRegisterStall: false,
    stepState: null,
    person: {
        loginDataReceived: false,
        role: "StallHolder",
        firstName: null,
        lastName: null,
        bio: null
    },
    stall: {
        image: null
    },
    showSingleStallMap: false,
    currentMarket: null
};

const getters = {
    currentMarket(state) {
        return state.currentMarket
    },
    showSingleStallMap(state) {
        return state.showSingleStallMap
    },
    stall(state) {
        return state.stall
    },
    showRegisterStall(state) {
        return state.showRegisterStall
    },
    stepState(state) {
        return state.stepState
    },
    person(state) {
        return state.person
    }
}

const mutations = {
    showSingleStallMap(state, payload) {
        state.showSingleStallMap = payload
    },
    stall(state, payload) {
        console.log('TCL: stall -> state.stall', state.stall);
        state.stall = payload
    },
    showRegisterStall(state, payload) {
        state.showRegisterStall = payload
    },
    stepState(state, payload) {
        state.stepState = payload
        console.log('TCL: ----------------------------------------------------');
        console.log('TCL: stepState -> state.stepState ', state.stepState);
        console.log('TCL: ----------------------------------------------------');
    },
    person(state, payload) {
        // if (payload.email !== state.person.email) {
        //     state.person.publicEmail = payload.email
        //     delete payload.email
        //     console.log('TCL: person -> payload', payload);

        //     state.person = Object.assign(state.person, payload)
        // } else {
        //     state.person = Object.assign(state.person, payload)
        // }
        state.person = Object.assign(state.person, payload)
        console.log('TCL: person -> state.person', state.person);
    }

}

const actions = {
    showSingleStallMap({
        state,
        commit
    }, payload) {
        commit('showSingleStallMap', payload)
    },
    stall({
        state,
        commit
    }, payload) {
        commit('stall', payload)
    },
    showRegisterStall({
        state,
        commit
    }, payload) {
        state.currentMarket = payload.forMarket
        commit('showRegisterStall', payload.show)
    },

    stepState({
        state,
        commit
    }, payload) {
        commit('stepState', payload)
    },

    personFormData({
        commit
    }, payloadObj) {

        commit('person', payloadObj)
    },

    personMarket({
        commit
    }, payloadVar) {
        var tempPerson = {
            market: payloadVar
        }
        commit('person', tempPerson)
    },

    personLoginData({
        state,
        commit
    }, payload) {
        console.log('TCL: payload', payload);
        var person = {}
        person.accessToken = payload.accessToken
        person.token = payload.token
        person.image = payload.user.picture
        person.email = payload.user.email
        if (payload.user.family_name !== 'undefined') {
            person.firstName = payload.user.given_name
            person.lastName = payload.user.family_name
        } else {
            person.name = null
        }
        person.loginDataReceived = true
        commit('person', person)
    },

    async saveStallHolder({
        state
    }) {
        const person = state.person
        console.log('TCL: -------------------');
        console.log("TCL: person", JSON.stringify(person));
        console.log('TCL: -------------------');
        const stall = state.stall
        console.log('TCL: stall', JSON.stringify(stall));
        
// TODO: Celebrate successfull form completion with an animation

        const response = await apollo.mutate({ mutation: gql`
                mutation createStallHolder(
                    $stall: StallofUserInput!
                    $profile: UserProfileInput!
                ){
                    createStallHolder(
                        stall: $stall
                        profile: $profile
                    ) {
                        id
                    }
                }
            `, 
            variables: {
                stall: {
                    lng: stall.lng,
                    lat: stall.lat,
                    w3w: stall.w3w.words,
                    image: stall.image,
                    name: stall.name,
                    description: stall.description,
                    market: stall.markets[0]
                },
                profile: {
                    cell: person.cell,
                    image: person.image,
                    publicEmail: person.publicEmail,
                    publicName: person.publicName,
                    bio: person.bio
                }
            }
                });
        console.log('TCL: response', response);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}