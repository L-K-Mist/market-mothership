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
    isPrismaAuth: null,
    isLoggedIn: false,
    authUser: null,
}

const getters = {
    tokensExpiry: state => state.tokensExpiry,
    accessToken: state => state.accessToken,
    idToken: state => state.idToken,
    isLoggedIn: state => state.isLoggedIn,
    isPrismaAuth: state => state.isPrismaAuth,
    prismaToken: state => state.prismaToken,
    authUser: state => state.authUser
}

const mutations = {
    update_auth_tokens(state, tokenData) {
        console.log("​update_auth_tokens -> tokenData", tokenData)
        state.accessToken = tokenData.accessToken || tokenData.access_token
        console.log("​update_auth_tokens -> state.accessToken", state.accessToken)

        state.idToken = tokenData.idToken || tokenData.id_token
        console.log("​update_auth_tokens -> state.idToken ", state.idToken)
        const tokensExpiry = addSeconds(new Date(), tokenData.expiresIn || tokenData.expires_in);
        state.tokensExpiry = tokensExpiry;
        state.authUser = tokenData.idTokenPayload
        console.log("​update_auth_tokens -> state.authUser", state.authUser)
        if (state.accessToken) {
            state.isLoggedIn = true
        } else {
            state.isLoggedIn = false
        }
    },
    prismaToken(state, token) {
        state.isPrismaAuth = token ? true : false
        console.log("​prismaToken ->  state.isPrismaAuth", state.isPrismaAuth)
        state.prismaToken = token
    },

    isLoggedIn(state, bool) {
        state.isLoggedIn = bool
        console.log("​isLoggedIn -> state.isLoggedIn", state.isLoggedIn)

    }
}

const actions = {

    async prismaAuth({
        state,
        commit
    }) {
        if (!state.isLoggedIn) {
            console.error("Dee, you can't authorise prisma if user is not logged in")
            return
        }
        if (state.authUser) {
            try {
                const response = await apollo.mutate({
                    mutation: AUTHORIZE,
                    variables: {
                        email: state.authUser.email,
                        name: state.authUser.name,
                        authId: state.accessToken.split('.')[2]
                    }
                })
                console.log('TCL: asyncauthorizeUser -> response', response.data.authorize.token);
                console.log('TCL: asyncauthorizeUser -> response user', response.data.authorize.user);
                commit('prismaToken', response.data.authorize.token)
                return response
            } catch (err) {
                console.error(err)
            }
        }
    },
    async parseTokens({
        dispatch,
        commit,
        hashValue
    }) {
        console.log("​update_auth_user -> hashValue", hashValue)
        await auth0.parseHash((err, authResult) => {
            console.log("​update_auth_user -> authResult", authResult)
            if (authResult.accessToken && authResult.idToken) {

                commit('update_auth_tokens', authResult)
                dispatch('personLoginData', authResult.idTokenPayload)
                dispatch('prismaAuth')
                return authResult

            } else if (err) {
                // this.logout()
                reject(err)
            }
        })
        // await dispatch('prismaAuth')
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}