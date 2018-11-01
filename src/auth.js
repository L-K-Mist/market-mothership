import auth0 from 'auth0-js'
import Vue from 'vue'
import gql from 'graphql-tag'
import apollo from '@/apollo'

const AUTHORIZE = gql `
    mutation authorize($email: String!, $authId: String!, $name: String!) {
        authorize(email: $email, authId: $authId, name: $name) {
            token
            user {
                id
                name
                email
            }
        }
    }
`

// exchange the object with your own from the setup step above.
let webAuth = new auth0.WebAuth({
    domain: "welink.au.auth0.com",
    clientID: "0SIaIds4btTC6nLkYiOFkj5nJUg4GhJx",
    // make sure this line contains the port: 8080
    redirectUri: process.env.VUE_APP_ENV_CALLBACK,
    // we will use the api/v2/ to access the user information as payload
    audience: "https://" + "welink.au.auth0.com" + "/api/v2/",
    responseType: "token id_token",
    scope: "openid email profile" // define the scopes you want to use
});

let auth = new Vue({
    computed: {
        token: {
            get: function () {
                return localStorage.getItem('id_token')
            },
            set: function (id_token) {
                localStorage.setItem('id_token', id_token)
            }
        },
        prismaToken: {
            get: function () {
                return localStorage.getItem('prisma_token')
            },
            set: function (prismaToken) {
                localStorage.setItem('prisma_token', prismaToken)
            }
        },
        accessToken: {
            get: function () {
                return localStorage.getItem('access_token')
            },
            set: function (accessToken) {
                localStorage.setItem('access_token', accessToken)
            }
        },
        expiresAt: {
            get: function () {
                return localStorage.getItem('expires_at')
            },
            set: function (expiresIn) {
                let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
                localStorage.setItem('expires_at', expiresAt)
            }
        },
        user: {
            get: function () {
                return JSON.parse(localStorage.getItem('user'))
            },
            set: function (user) {
                localStorage.setItem('user', JSON.stringify(user))
            }
        }
    },
    methods: {
        login() {
            webAuth.authorize()
        },

        logout() {
            return new Promise((resolve, reject) => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('id_token')
                localStorage.removeItem('expires_at')
                localStorage.removeItem('user')
                localStorage.removeItem('prisma_token')
                // webAuth.authorize()
            })
        },

        async authorizeUser() {
            const response = await apollo.mutate({
                mutation: AUTHORIZE,
                variables: {
                    email: this.user.email,
                    name: this.user.name,
                    authId: this.token
                }
            })
            console.log('TCL: asyncauthorizeUser -> response', response);
            this.prismaToken = response.token
        },

        isAuthenticated() {
            return new Date().getTime() < this.expiresAt
        },

        handleAuthentication() {
            return new Promise((resolve, reject) => {
                webAuth.parseHash((err, authResult) => {

                    if (authResult && authResult.accessToken && authResult.idToken) {
                        this.expiresAt = authResult.expiresIn
                        this.accessToken = authResult.accessToken
                        this.token = authResult.idToken
                        this.user = authResult.idTokenPayload
                        resolve({
                            accessToken: this.accessToken,
                            token: this.accessToken,
                            user: this.user
                        })

                    } else if (err) {
                        this.logout()
                        reject(err)
                    }
                })
            })
        }
    }
})

export default {
    install: function (Vue) {
        Vue.prototype.$auth = auth
    }
}