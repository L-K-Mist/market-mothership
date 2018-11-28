<template>
    <v-card class="mt-2">
        <v-card-text>
        <v-layout row wrap>
            <v-flex @click="aboutMeInput = !aboutMeInput" xs12 md6 v-if="stall.owner">
            <strong>About me: </strong> {{stall.owner.bio}}
            </v-flex>
            <v-flex xs12 md6 v-if="stall.description">
            <strong>My shop: </strong> {{stall.description}}
            </v-flex>                  
        </v-layout>
        </v-card-text>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn color="primary" dark slot="activator">Open Dialog</v-btn>
                Hello world
            </v-dialog>
        </v-layout> 
    </v-card>    
</template>
<script>
export default {
  props: ["stall"],
  // my id is cjocd1r6071r60911vsip1fx3

  computed: {},
  data() {
    return {
      dialog: false
    };
  }
};
</script>
