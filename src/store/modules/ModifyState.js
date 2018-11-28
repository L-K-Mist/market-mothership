import apollo from "@/apollo.js";
import gql from "graphql-tag";

const state = {

}
const getters = {

}
const mutations = {

}
const actions = {
    async createProduct({
        commit,
        dispatch
    }, payload) {
        console.log("​payload", payload)

        try {
            dispatch('error', null)
            const response = await apollo.mutate({
                mutation: gql `
                mutation createProduct($input: CreateProductInput!){
                    createProduct(input: $input){
                       id 
                    }
                }
            `,
                variables: {
                    input: {
                        ...payload
                    }
                }
            })
            console.log("​response", response)

        } catch (err) {
            console.log("​}catch -> err", err)
            dispatch('error', err)
        }
    },
    async updateProduct({
        commit,
        dispatch
    }, payload) {
        console.log("​payload", payload)
        var input = {
            productId: payload.productId,
            name: payload.name,
            image: payload.image,
            description: payload.description,
            measurementUnit: payload.measurementUnit,
            unitsPerItem: payload.unitsPerItem,
            pricePerItem: payload.pricePerItem,
        }
        try {
            dispatch('error', null)
            const response = await apollo.mutate({
                mutation: gql `
                mutation updateProduct($input: UpdateProductInput!){
                    updateProduct(input: $input){
                       id 
                    }
                }
            `,
                variables: {
                    input

                }
            })
            console.log("​response", response)

        } catch (err) {
            console.log("​}catch -> err", err)
            dispatch('error', err)
        }
    },
    async updateStallHolder({
        commit,
        dispatch
    }, payload) {
        console.log("​payload", payload)

        try {
            dispatch('error', null)
            const response = await apollo.mutate({
                mutation: gql `
                mutation updateStallHolder($input: UserProfileInput!) {
                    updateStallHolder(input: $input) {
                       id 
                    }
                }
            `,
                variables: {
                    input: payload
                }
            })
            console.log("​response", response)

        } catch (err) {
            console.log("​}catch -> err", err)
            dispatch('error', err)
        }
    },
    async updateStall({
        commit,
        dispatch
    }, payload) {
        console.log("​payload", payload)

        try {
            dispatch('error', null)
            const response = await apollo.mutate({
                mutation: gql `
                mutation updateStall($input: StallofUserInput!) {
                    updateStall(input: $input) {
                       id 
                    }
                }
            `,
                variables: {
                    input: payload
                }
            })
            console.log("​response", response)

        } catch (err) {
            console.log("​}catch -> err", err)
            dispatch('error', err)
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}