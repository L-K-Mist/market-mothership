const state = {

}
const getters = {

}
const mutations = {

}
const actions = {
    async createProduct({
        commit
    }, payload) {
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

                    }
                }

            })
        } catch (error) {
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