<template>
    <div v-if="stalls !== null" >
        <div v-for="(stall, index) in stalls" :key="index"> 
            <div v-if="sid == stall.id">
                <v-layout column justify-center>
                    <v-card>
                        <v-img :aspect-ratio="16/9" class="background-image pb-6" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
                            <v-container grid-list-md>
                                <v-layout  v-if="stall.owner" pa-2 column fill-height class="lightbox white--text">
                            <!-- Useravatar -->
                                    <v-flex id="avatar-w-info" class="stallHolderPic">
                                        <v-avatar class="avatar-only elevation-12"
                                        size="20vw"
                                        color="grey lighten-4"
                                        >
                                            <img v-if="stall.owner.image" :src="stall.owner.image"/>
                                            <v-icon v-else size="17vw">fa-user</v-icon>
                                        </v-avatar>
                                        <div class="contact-wrapper text-shadow">
                                            <div class="subheading">{{stall.owner.publicName}}</div>
                                            <div class="body-1">{{stall.owner.publicEmail}}</div>
                                            <div v-if="stall.owner.cell" class="body-1">{{stall.owner.cell}}</div>
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
                            <!-- CHANGE AVATAR DIALOG -->
                            </v-container>
                        </v-img>
                    </v-card>

                <!-- text details -->
                    <v-card class="mt-2" >
                        <v-card-text>
                        <v-layout row wrap>
                            <v-flex class="pa-2" @click="aboutMeInput = !aboutMeInput" xs12 md6 v-if="stall.owner">
                            <strong>About me: </strong> {{stall.owner.bio}}
                            </v-flex>
                            <v-flex class="pa-2" xs12 md6 v-if="stall.description">
                            <strong>My shop: </strong> {{stall.description}}
                            </v-flex>                  
                        </v-layout>
                        </v-card-text>
                    </v-card>     
                </v-layout>
            </div>  
        </div>
    </div>
</template>
<script>
export default {
  // my id is cjocd1r6071r60911vsip1fx3
  mounted() {
    // const stallHolder = this.stallHolder;
    // console.log("​-----------------------------------");
    // console.log("​mounted -> stallHolder", stallHolder);
    // console.log("​-----------------------------------");
    // const stalls = this.stalls;
    // console.log("​-----------------------");
    // console.log("​StallDetails mounted -> stalls", stalls);
    // console.log("​-----------------------");
  },
  computed: {
    // stallHolder: {
    //   get() {
    //     return this.$store.getters.stallHolder;
    //   },
    //   set(val) {
    //     this.$store.dispatch("stallHolder", val);
    //   }
    // },
    stalls: {
      get() {
        return this.$store.getters.stalls;
      }
      //   set(val) {
      //     this.$store.dispatch("stall", val);
      //   }
    }
  },
  data() {
    return {
      aboutMeInput: false,
      sid: this.$route.params.Sid
    };
  }
};
</script>

<style scoped>
.stallHolderPic {
  position: absolute;
  right: 1vw;
  top: 5vw;
  /* cursor: pointer; */
}
.avatar-only {
  position: relative;
}
.cloudinary-user {
  position: absolute;
  top: 15vh;
  right: 4vw;
  z-index: 5;
}
.cloudinary-stall {
  position: absolute;
  top: 15vh;
  left: 6vw;
  z-index: 5;
}
.stall-image {
  min-width: 50vw;
  max-width: 80vw;
}
.contact-wrapper {
  background-blend-mode: hue;
  position: relative;
}
.background-image {
  filter: grayscale(0.2);
}
.stall-name {
  color: lightgrey;
  font-size: 6vw;
  /* background-blend-mode: screen; */
  mix-blend-mode: luminosity;
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
