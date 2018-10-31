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
    stepState: null,
    person: {
        loginDataReceived: false,
        category: "stallHolder",
        firstName: null,
        lastName: null,
        bio: null
    }
}

const getters = {
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
        state.person = Object.assign(state.person, payload)
        console.log('TCL: person -> state.person', state.person);
    }
}

const actions = {

    showRegisterStall({
        state,
        commit
    }, payload) {
        commit('showRegisterStall', payload)
    },

    stepState({
        state,
        commit
    }, payload) {
        commit('stepState', payload)
    },

    personFormData({
        commit
    }, payload) {

    },

    personMarket({
        commit
    }, payload) {
        var tempPerson = {
            market: payload
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
        person.picture = payload.user.picture
        person.email = payload.user.email
        if (payload.user.family_name !== 'undefined') {
            person.firstName = payload.user.given_name
            person.lastName = payload.user.family_name
        } else {
            person.name = null
        }
        person.loginDataReceived = true
        commit('person', person)
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}