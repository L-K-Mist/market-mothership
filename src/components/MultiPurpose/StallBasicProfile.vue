<template>
    <v-card class="mt-2">
        <v-card-text>
        <v-layout row wrap>
            <v-flex @click="aboutMeInput = !aboutMeInput" xs12 md6 v-if="stall.owner">
                <slot></slot>
            <strong>About me: </strong> {{stall.owner.bio}}
            </v-flex>
            <v-flex xs12 md6 v-if="stall.description">
            <strong>My shop: </strong> {{stall.description}}
            </v-flex>
            <br><br>    
            <v-flex xs12 md6 v-if="stall.description">
                <p>
                    You can find me more specifically - within {{stall.markets[0].name}} - by using my unique 3m x 3m What3Words Address; which is: <strong> {{stall.w3w}}</strong>.
                </p>
                <p>
                    If you click <a :href="`http://w3w.co/${stall.w3w}`" target="blank">this link </a> it will take you to the W3W map of this address.

                </p>
                <p class="font-weight-thin">
                                        (Note: Because W3W is Closed Source; we are currently not allowed to duplicate their grid system on our own maps, nor google maps. That may change in time if they come to see this application as a useful champion of the What3Words Global Address System.)

                </p>
            </v-flex>                              
        </v-layout>
        </v-card-text>

    </v-card>    
</template>
<script>
export default {
  props: ["stall"],
  // my id is cjocd1r6071r60911vsip1fx3

  computed: {},
  data() {
    return {};
  }
};
</script>
