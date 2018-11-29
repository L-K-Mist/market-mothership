<template>
    <div>
        <div v-if="stalls !== null" v-for="(stall, index) in stalls" :key="index"> 
            <div v-if="sid == stall.id">
                <v-layout column justify-center>
                    <v-container grid-list-xs>
                        <v-card>
                            <v-img :aspect-ratio="16/9" class="background-image pb-6" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
                                <v-container grid-list-md>
                                    <v-layout  v-if="stall.owner" pa-2 column fluid class="lightbox white--text">
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
                                            <v-img :src="stall.image" alt="image of shop" height="50%">

                                            </v-img>
                                        <!-- <v-flex xs8>
                                            <v-layout fill-height row justify-end>
                                                <img class="stall-image" :src="stall.image" alt="image of shop"/>
                                                
                                            </v-layout>
                                        </v-flex> -->
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
                    </v-container>
                <!-- text details -->
                <v-container grid-list-xs>
                    <stall-basic-profile :stall="stall"></stall-basic-profile>
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
                </v-container>
                </v-layout>
            </div>  
        </div>
        <v-container grid-list-xs>
            <div v-if="products">
                <products-list :products="products"></products-list>
            </div>
            
        </v-container>
    </div>
</template>
<script>
import ProductsList from "@/components/MultiPurpose/ProductsList";
import StallBasicProfile from "@/components/MultiPurpose/StallBasicProfile";

export default {
  // my id is cjocd1r6071r60911vsip1fx3
  created() {
    this.$store.dispatch("fetchProducts", this.sid);
    // this.$store.dispatch("fetchStall", this.sid);
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
    },
    products: {
      get() {
        return this.$store.getters.stallProducts;
      }
    }
  },
  data() {
    return {
      sid: this.$route.params.Sid
    };
  },
  components: {
    ProductsList,
    StallBasicProfile
  }
};
</script>

<style scoped>
.stallHolderPic {
  position: absolute;
  left: 1vw;
  top: 5vw;
  z-index: 2;
  height: 60%;
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
  justify-content: unset;

  /* position: relative;
  left: 8vw;
  z-index: 1; */
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
  z-index: 2;
}
.text-shadow {
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
}
.border {
  border: 40em;
}
</style>
