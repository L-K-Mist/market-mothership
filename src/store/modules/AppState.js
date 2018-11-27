import apollo from "@/apollo.js";
import gql from "graphql-tag";


const state = {
    newRoute: null,
    hasStall: false,
    activeUser: null,
    error: null,
    stallHolder: null,
    stalls: null,
    stallProducts: null,
    screenSize: 'xs'
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
    },
    newRoute(state) {
        return state.newRoute
    },
    stalls(state) {
        return state.stalls
    },
    stallProducts(state) {
        return state.stallProducts
    },
    screenSize(state) {
        return state.screenSize
    },
}

const mutations = {
    hasStall(state, payload) {
        state.hasStall = payload
    },

    stallHolder(state, payload) {
        state.stallHolder = payload
        console.log('TCL: commit -> state.stallHolder', state.stallHolder);
    },
    newRoute(state, payload) {
        state.newRoute = payload
        console.log("​newRoute -> payload", payload)

    },
    stalls(state, payload) {
        state.stalls = payload
        console.log("​newRoute -> payload", stalls)
    },

}
const actions = {
    stallHolder({
        state,
        commit
    }, payload) {
        commit('stallHolder', payload)
    },
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
            console.log("​}catch -> state.error", state.error)

            // alert(err)
        }

    },
    async fetchMe({
        state,
        commit
    }) {
        state.error = null
        try {
            const response = await apollo.query({
                query: gql `
                {
                    me {
                        id
                        name
                        cell
                        role
                        image
                        publicEmail
                        publicName
                        bio
                    }
                }
              `
            });
            console.log("​------------------")
            console.log("​response stallholder", response.data.me)
            console.log("​------------------")
            commit('stallHolder', response.data.me)

            return response.data.me

        } catch (err) {
            state.error = err
            console.log("​}catch -> state.error", state.error)

            // alert(err)
        }

    },
    async fetchStalls({
        state,
        commit
    }, payload) {
        state.error = null
        try {
            const response = await apollo.query({
                query: gql `
                query {
                    stalls {
                        id
                        image
                        w3w
                        lng
                        lat
                        name
                        description
                        owner {
                            name
                            id
                            bio
                            image
                            cell
                            publicEmail
                            publicName
                        }
                        markets {
                            name
                            province {
                                name
                            }
                            id
                        }
                        products {
                            id
                            name
                            image
                            description
                            measurementUnit
                            unitsPerItem
                            pricePerItem
                        }
                    }
                }
                `
            })
            const stalls = response.data.stalls
            console.log("​stalls", stalls)
            commit('stalls', response.data.stalls)
            return stalls //might be unessecary
        } catch (err) {
            console.log("​}catch -> state.error", state.error)
            // alert(err)
        }
    },



    async fetchProducts({
        state
    }, payload) {
        state.error = null
        try {
            const response = await apollo.query({
                query: gql `
                query stallProducts($stallId: String!) {
                    stallProducts(stallId: $stallId) {
                        id
                        name
                        image
                        description
                        measurementUnit
                        unitsPerItem
                        pricePerItem
                    }
                }
                `,
                variables: {
                    stallId: payload
                }
            })
            state.stallProducts = response.data.stallProducts
            console.log("​state.stallProducts", state.stallProducts)

            return state.stallProducts

        } catch (error) {
            console.log("​}catch -> error", error)

        }

    },
    viewPort({
        state
    }, payload) {
        state.screenSize = payload
        console.log("​state.screenSize", state.screenSize)
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