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
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}