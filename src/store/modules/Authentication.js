import addSeconds from "date-fns/add_seconds";
import {
    auth0
} from "@/session.js";

import gql from 'graphql-tag'
import apollo from '@/apollo'

const AUTHORIZE = gql `
    mutation authorize($email: String!, $authId: String!, $name: String!) {
        authorize(email: $email, authId: $authId, name: $name) {
            token
            user{
            id
            name
            publicEmail
            publicName
            bio
            image
            role
            }
        }
    }
`


// Based on: https://itnext.io/managing-and-refreshing-auth0-tokens-in-a-vuejs-application-65eb29c309bc



const state = {
    idToken: null,
    accessToken: null,
    tokensExpiry: null,
    prismaToken: null,
    isLoggedIn: false
}

const getters = {
    tokensExpiry: state => state.tokensExpiry,
    accessToken: state => state.accessToken,
    idToken: state => state.idToken,
    isLoggedIn: state => state.isLoggedIn
}

const mutations = {
    update_auth_tokens(state, tokenData) {
        console.log("​update_auth_tokens -> tokenData", tokenData)
        state.accessToken = tokenData.accessToken
        state.idToken = tokenData.idToken
        const tokensExpiry = addSeconds(new Date(), tokenData.expiresIn);
        state.tokensExpiry = tokensExpiry;
        if (state.accessToken && state.idToken) {
            state.isLoggedIn = true
        } else {
            state.isLoggedIn = false
        }
    },
    isLoggedIn(state, bool) {
        state.isLoggedIn = bool
    }
}

const actions = {

    async prismaAuth({
        state
    }) {
        if (!state.isLoggedIn) {
            console.error("Dee, you can't authorise prisma if user is not logged in")
            return false
        }
        try {
            const response = await apollo.mutate({
                mutation: AUTHORIZE,
                variables: {
                    email: this.user.email,
                    name: this.user.name,
                    authId: parseToken(this.token)
                }
            })
            console.log('TCL: asyncauthorizeUser -> response', response.data.authorize.token);
            localStorage.setItem('prisma_token', response.data.authorize.token)
            this.isPrismaConnected = true
            console.log("​-----------------------------------------------------")
            console.log("​authorizeUser -> isPrismaConnected", this.isPrismaConnected)
            console.log("​-----------------------------------------------------")
            return response
        } catch (err) {
            console.error(err)
            return false
        }
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}