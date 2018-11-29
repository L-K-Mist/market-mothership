<template>
    <v-card>
        <v-card-title>
            <span class="headline">In a Nutshell</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-lg>
                <v-layout wrap>
                    <v-flex @click="myStall.owner.bio = ''" xs12 md6>
                        <v-textarea
                            multi-line
                            label="About Me"
                            hint="Your shop in general terms. Use lots of keywords, as this is what we scan in customer search queries."
                            v-model="myStall.owner.bio"
                        ></v-textarea>
                        
                    </v-flex>
                    <v-flex @click="myStall.name = ''" xs12 md6>
                        <v-text-field
                            label="Shop Name"
                            hint="The name your shop is known as"
                            v-model="myStall.name"
                        ></v-text-field> 
                        
                    </v-flex> 
                    <v-flex @click="myStall.description = ''" xs12 md6>
                        <v-textarea
                            multi-line
                            label="My Shop"
                            hint="Your shop in general terms. Use lots of keywords, as this is what we scan during customer search queries."
                            v-model="myStall.description"
                        ></v-textarea>
                    </v-flex>
                    <v-flex xs12 md6>
                    </v-flex>               
                    <v-btn color="accent">Save Changes</v-btn>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>

        </v-card-actions>
    </v-card>  
</template>
<script>
export default {
  props: ["stall"],
  data() {
    return {
      myStall: this.stall
    };
  },
  computed: {
    // markets() {
    //   return this.$store.getters.markets;
    // }
  }
};
</script>
