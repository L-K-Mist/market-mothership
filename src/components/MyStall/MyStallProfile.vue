<template>
    <v-card class="mt-2">
        <v-card-text>
        <v-layout row wrap>
            <v-flex @click="aboutMeInput = !aboutMeInput" xs12 md6 v-if="stallHolder">
            <strong>About me: </strong> {{stallHolder.bio}}
            </v-flex>
            <v-flex xs12 md6 v-if="stall.description">
            <strong>My shop: </strong> {{stall.description}}
            </v-flex>                  
        </v-layout>
        </v-card-text>
    </v-card>     
</template>
<script>
export default {
    // my id is cjocd1r6071r60911vsip1fx3
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
    computed: {
        stallHolder: {
          get() {
            return this.$store.getters.stallHolder;
          },
          set(val) {
            this.$store.dispatch("stallHolder", val);
          }
        },
        stall: {
          get() {
            return this.$store.getters.stall;
          },
          set(val) {
            this.$store.dispatch("stall", val);
          }
        },

        
        } ,   
    data(){
        return {
            aboutMeInput: false
        }
    }
}
</script>
