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
