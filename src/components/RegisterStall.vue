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
              <v-btn dark flat @click.native="dialog = false">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          
            <v-stepper v-model="stepState" vertical>
                <v-stepper-step :complete="$auth.isAuthenticated()" step="1">
                Signup
                <small>Signup with Google or Manually</small>
                </v-stepper-step>
                    <v-stepper-content step="1">

                        <v-card class="mb-5"></v-card>
                        <v-btn v-if="!signedIn" @click="signup()"  color="secondary">Sign Up</v-btn>
                        <v-btn color="accent" @click="stepState = 2">Continue</v-btn>
                        <v-btn flat>Cancel</v-btn>

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
                  <small>The Reason you're bothering with online forms (hey, we're trying to make this as painless as possible!)</small>
                </v-stepper-step>

                <v-stepper-content step="3">
                  <v-text-field
                      label="Shop Name"
                      hint="The name your shop is known as"
                      v-model="stall.name"
                  ></v-text-field>
                  <p class="lighten-1">Let your customers know exactly where to find you within {{person.market}}.</p>
                  <p class="lighten-1">If you allow geolocation, the marker appear at your current location, feel free to drag it to the right spot.</p>
                  <v-dialog v-if="stepState === 3"
                    v-model="locDialog"
                    width="500"
                  >
                    <v-btn
                      slot="activator"
                      color="primary"
                      dark
                    >
                      Click Me
                    </v-btn>
              
                    <v-card>
                      <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                      >
                        Privacy Policy
                      </v-card-title>
              
                      <v-card-text>
                        <me-map v-if="locDialog"></me-map>
                      </v-card-text>
              
                      <v-divider></v-divider>
              
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          flat
                          @click="dialog = false"
                        >
                          I accept
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>                  

                </v-stepper-content>

                <v-stepper-step step="4">View setup instructions</v-stepper-step>
                <v-stepper-content step="4">
                <v-card color="grey lighten-5" class="mb-5"></v-card>
                <v-btn flat>Cancel</v-btn>
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
export default {
  mounted() {
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
      locDialog: false
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
    }
  },
  methods: {
    signup() {
      this.$auth.login();
    },
    gotBio(person) {
      this.stepState = 3;
      this.$store.dispatch("personFormData", person);
    }
  },
  components: {
    StallLocation,
    StallHolder,
    MeMap
  }
};
</script>

  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({ name: 'home' })
    })
  }