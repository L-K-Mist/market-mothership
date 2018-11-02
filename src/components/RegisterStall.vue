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
                <v-card color="grey lighten-5" class="mb-5">
                    <v-card-text>
                        <v-flex v-if="person.loginDataReceived" xs12>
                            <v-avatar
                            size="38px"
                            color="grey lighten-4">
                                <img :src="person.picture">
                            </v-avatar>
                            <v-text-field
                                label="First Name"
                                hint="The name you're best known by."
                                v-model="person.firstName"
                            ></v-text-field>     
                            <v-text-field
                                label="Last Name"
                                hint="Yip, AKA Surname."
                                v-model="person.lastName"
                            ></v-text-field>   
                            <v-text-field
                                label="Email"
                                hint="Choose the email address you want use for customer interaction"
                                v-model="person.email"
                            ></v-text-field>
                            <v-text-field multi-line
                                label="Bio"
                                hint="If you knew me well, you'd know..."
                                v-model="person.bio"
                            ></v-text-field>                       
                        </v-flex>
                        
                    </v-card-text>

                </v-card>
                <v-btn color="primary" @click="stepState = 3">Continue</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="stepState > 3" step="3">
                  Your Shop
                  <small>The Reason you're bothering with online forms (hey, we're trying to make this as painless as possible!)</small>
                </v-stepper-step>

                <v-stepper-content step="3">
                <v-card color="grey lighten-5" class="mb-5"></v-card>
                <v-btn color="primary" @click="stepState = 4">Continue</v-btn>
                </v-stepper-content>

                <v-stepper-step step="4">View setup instructions</v-stepper-step>
                <v-stepper-content step="4">
                <v-card color="grey lighten-5" class="mb-5"></v-card>
                <v-btn flat>Cancel</v-btn>
                </v-stepper-content>
            </v-stepper>            

        </v-card>
      </v-dialog>
    </v-layout>
</template>


<script>
export default {
  mounted() {
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
  // data() {
  //     return {
  //         // stepState: 1
  //     }
  // },
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
    person() {
      return this.$store.getters.person;
    }
  },
  methods: {
    signup() {
      this.$auth.login();
    }
  }
};
</script>
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({ name: 'home' })
    })
  }