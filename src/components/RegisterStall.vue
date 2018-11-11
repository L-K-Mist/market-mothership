<template>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="dialog = false">
              <v-icon>fa-close</v-icon>
            </v-btn>

            <v-toolbar-title>Register Yourself and Your Shop</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <!-- <v-btn dark flat >Save</v-btn> -->
            </v-toolbar-items>
          </v-toolbar>
          
            <v-stepper v-model="stepState" vertical>
                <v-stepper-step :complete="$auth.isAuthenticated()" step="1">
                Login
                <small>Login with Google or Manually (Google method means less typing for you.)</small>
                </v-stepper-step>
                    <v-stepper-content step="1">

                        <v-card class="mb-5"></v-card>
                        <v-btn v-if="!signedIn" @click="signup()"  color="primary">Log In</v-btn>
                        <!-- <v-btn color="accent" @click="stepState = 2">Continue</v-btn>
                        <v-btn flat>Cancel</v-btn> -->

                    </v-stepper-content>

                <v-stepper-step :complete="stepState > 2" step="2">
                    Your Personal Profile
                    <small v-if="person.firstName">Thanks {{ person.firstName }}, let's help your potential customers get to know you better</small>
                    <small v-else>Let your potential customers get to know you better</small>
                </v-stepper-step>
                <v-stepper-content step="2">
                  <stall-holder @gotBio="gotBio(person)"></stall-holder>
                </v-stepper-content>

                <v-stepper-step :complete="stepState > 3" step="3">
                  Your Shop
                  <small>The Reason you're bothering with online forms (C'mon, we're trying to make this as painless as possible!)</small>
                </v-stepper-step>

                <v-stepper-content step="3">
                  <v-text-field
                      label="Shop Name"
                      hint="The name your shop is known as"
                      v-model="stall.name"
                  ></v-text-field>
                  <p>
                    We know you might be active at more than one flea market, but for now, we are only allowing one shop per person.
                  </p>
                  <p>
                    Therefore, if {{$store.getters.currentMarket}} is not your "home base" flea market, please choose from below.
                    If none of your markets are represented, please contact us!
                  </p> 
                  <v-select
                    :items="markets"
                    label="Select your main market"
                    hint="You'll be able to add more markets later."
                    v-model="mainMarket"
                    @input="person.market = mainMarket"
                  ></v-select>
                  <p class="lighten-1">Let your customers know exactly where to find you within the market.</p>
                  <p class="lighten-1">If you allow geolocation, the marker will appear at your current location, feel free to drag it to the right spot.</p>
                  <v-dialog v-if="stepState === 3"
                    v-model="locDialog"
                    width="500"
                  >
                    <v-btn
                      slot="activator"
                      color="primary"
                      dark
                    >
                      Find Me
                    </v-btn>
                    <me-map v-if="locDialog" @done="gotLoc"></me-map>
                  </v-dialog>
                  <!-- <p v-if="stall.w3w !== 'undefined'">Your shop's world-wide  <a :href="`http://w3w.co/${stall.w3w.words}`">What3Words</a> address is: <strong>{{stall.w3w.words}}</strong></p>    -->
                  <p>How about a picture of you doing your thing! (You can also add this later if you want)</p>
                  <v-layout row>
                    <v-cloudinary-upload 
                      buttonColor="primary"
                      button-icon="fa-camera"
                      v-model="stallImageId"
                      :upload-preset="cloudinary.preset"
                      :cloud-name="cloudinary.name"
                      @input="gotImageSource"
                    />
                    <v-icon v-if="stallImageId" @click="deleteImage">fa-times-circle</v-icon>
                  </v-layout>
                  <!-- <img
                    v-if="stall.image"
                    :src="stall.image" />   -->
                  <v-text-field
                      multi-line
                      label="Description"
                      hint="Your shop in general terms (indivdual product descriptions come later)"
                      v-model="stall.description"
                  ></v-text-field>               
                  <v-btn color="accent" @click="gotStall">Continue</v-btn>
                </v-stepper-content>
                <v-stepper-step step="4">View setup instructions</v-stepper-step>
                <v-stepper-content step="4">
                <v-card color="grey lighten-5" class="mb-5"></v-card>
                <v-btn flat @click.native="dialog = false">Cancel</v-btn>
                </v-stepper-content>
            </v-stepper>            
            <!-- <stall-location/> -->
        </v-card>
      </v-dialog>
    </v-layout>
</template>

<script>
import StallHolder from "@/components/RegisterStall/StallHolder";
import StallLocation from "@/components/RegisterStall/StallLocation";
import MeMap from "@/components/MeMap";
import vuetifyCloudinaryUpload from "vuetify-cloudinary-upload";
import srcForCloudinary from "@/helpers/srcForCloudinary.js";

export default {
  mounted() {
    this.mainMarket = this.person.market
    // this.stepState =
    this.$nextTick(() => {
      if (!this.$auth.isAuthenticated()) {
        this.stepState = 1;
      } else {
        var user = JSON.stringify(this.$auth.user);
        console.log("TCL: --------------------------");
        console.log("TCL: mounted -> user", user);
        console.log("TCL: --------------------------");
        this.stepState = 2;
      }
    });
  },
  data() {
    return {
      stallImageId: null,
      locDialog: false,
      cloudinary: {
        name: "dylan-van-den-bosch",
        preset: "gi9lyrb6"
      },
      mainMarket: null
    };
  },
  computed: {
    dialog: {
      get() {
        return this.$store.getters.showRegisterStall;
      },
      set(bool) {
        this.$store.dispatch("showRegisterStall", bool);
      }
    },
    signedIn() {
      return this.$auth.isAuthenticated();
    },
    stepState: {
      get() {
        return this.$store.getters.stepState;
      },
      set(val) {
        this.$store.dispatch("stepState", val);
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
    person() {
      return this.$store.getters.person;
    },
    markets() {
      var marketArray = this.$store.getters.markets.map(function(market) {
        return market.name;
      });
      return marketArray;
    }
  },

  //Note the w3w link struct: http://w3w.co/various.deform.restriction

  methods: {
    signup() {
      this.$auth.login();
    },
    gotBio(person) {
      this.stepState = 3;
      this.$store.dispatch("personFormData", person);
    },
    gotImageSource(e) {
      console.log("TCL: gotImageSource -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSource -> src", src);
      this.stall.image = src;
    },
    gotLoc(locData) {
      this.stall.lat = locData.lat;
      this.stall.lng = locData.lng;
      this.stall.w3w = locData.w3w;
      this.locDialog = false;
      this.$store.dispatch("stall", this.stall);
    },
    gotStall() {
      this.stall.markets = [];
      this.stall.markets[0] = this.mainMarket;
      this.$store.dispatch("stall", this.stall);
      this.$store.dispatch("saveStallHolder");
      this.stepState = 4;
    },

    deleteImage() {
      this.stallImageId = null;
    }
  },
  components: {
    StallLocation,
    StallHolder,
    MeMap,
    "v-cloudinary-upload": vuetifyCloudinaryUpload
  }
};
</script>

<style>
img {
  max-width: 80vw;
}
</style>


  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({ name: 'home' })
    })
  }