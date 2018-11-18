<template>
    <v-card class="mt-2">
        <v-card-text>
        <v-layout row wrap>
            <v-flex @click="aboutMeInput = !aboutMeInput" xs12 md6 v-if="stallHolder">
            <strong>About me: </strong> {{stallHolder.bio}}
            </v-flex>
            <v-textarea   v-if="aboutMeInput" @keyup.enter="aboutMeInput = false"
                auto-grow
                
                v-model="stallHolder.bio"
                name="about-me"
                label="label"
                id="id"
            ></v-textarea>
            <v-flex xs12 md6 v-if="stall.description">
            <strong>My shop: </strong> {{stall.description}}

            </v-flex>                  
        </v-layout>
        </v-card-text>
    </v-card>     
</template>
<script>
export default {
    mounted(){
    const stallHolder = this.stallHolder
    console.log("​-----------------------------------")
    console.log("​mounted -> stallHolder", stallHolder)
    console.log("​-----------------------------------")
    const stall = this.stall
    console.log("​-----------------------")
    console.log("​mounted -> stall", stall)
    console.log("​-----------------------")
    },
    props: {
        stallHolder: {
            type: Object
        },
        stall: {
            type: Object
        }
    },
    data(){
        return {
            aboutMeInput: false
        }
    }
}
</script>
