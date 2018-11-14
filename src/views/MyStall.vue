<template>
    <v-container grid-list-xs>
        <v-layout column justify-center>
            <v-card>
                <v-img :aspect-ratio="16/9" class="background-image pb-6" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
                    <v-container grid-list-md>
                      <v-layout  v-if="stallHolder" pa-2 column fill-height class="lightbox white--text">
    
                        <v-flex id="avatar-w-info" class="stallHolderPic">
                            <v-avatar class="elevation-12 border"
                            size="20vw"
                            color="grey lighten-4"
                            >
                                <img v-if="stallHolder.image" :src="stallHolder.image"/>
                                <v-icon v-else size="150">fa-user</v-icon>
                            </v-avatar>
                            <div class="contact-wrapper text-shadow">
                                <div class="subheading">{{stallHolder.publicName}}</div>
                                <div class="body-1">{{stallHolder.publicEmail}}</div>
                                <div v-if="stallHolder.cell" class="body-1">{{stallHolder.cell}}</div>
                            </div>
                        </v-flex>
                        <v-flex xs8>
                          <img class="stall-image" :src="stall.image" alt="image of shop"/>
                          
                        </v-flex>
                        <v-layout row>
                          <v-flex xs12 >
                              <h3 class="stall-name text-shadow">{{stall.name}}</h3>
                          </v-flex>
                          
                        </v-layout>
                      </v-layout>
                      <v-progress-circular v-else color="indigo" indeterminate :size="200" :width="16"></v-progress-circular>
                    </v-container>
                </v-img>
            </v-card>
            <v-card class="mt-2">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 md6 v-if="stallHolder">
                    <strong>About me: </strong> {{stallHolder.bio}}
                    
                  </v-flex>
                  <v-flex xs12 md6 v-if="stall.description">
                    <strong>My shop: </strong> {{stall.description}}

                  </v-flex>                  
                </v-layout>
              </v-card-text>
            </v-card>   
            <v-card class="mt-2">
              <v-card-title primary-title>
                My Products
              </v-card-title>
              <v-card-text>
                  <v-flex xs12>
                    <p>
                    Yip Walter, this is where the shop's items will be displayed. 
                    If you've gotten this far, then that means we've got at least two dummy-shops to play with from the shopper's perspective.
                    My next action steps will be to make this page editable by the stall-owner, and the add products feature for the dude.
                    </p>

                    <p>
                      I hope that just seeing this online will get the creative juices flowing for our next conversation.
                    </p>

                  </v-flex>                  

              </v-card-text>
            </v-card>    
        </v-layout>
    </v-container>
</template>
<script>
// TODO NEXT: solve the stallImage issue
export default {
  created() {},
  async mounted() {
    this.$store.dispatch("fetchMyStall");
    this.stallHolder = await this.$store.dispatch("fetchMe");
    // console.log("​mounted -> me", me);
  },
  data() {
    return {};
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

    stallImage() {
      // if go with both then remove
      if (this.stall.image) {
        return this.stall.image;
      } else if (!this.stall.image) {
        return "https://cdn.vuetifyjs.com/images/parallax/material.jpg";
      }
    }
  }
};
</script>
<style scoped>
.stallHolderPic {
  position: absolute;
  right: 1vw;
  top: 5vw;
}
.stall-image {
  min-width: 50vw;
  max-width: 80vw;
}
.contact-wrapper {
  background-blend-mode: hue;
}
.background-image {
  filter: grayscale(0.2);
}
.stall-name {
  color: lightgrey;
  font-size: 6vw;
  mix-blend-mode: darken;
  position: absolute;
  bottom: 0.2vw;
  /* top: -5vw; */
  left: 1vw;
}
.text-shadow {
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
}
.border {
  border: 40em;
}
</style>


