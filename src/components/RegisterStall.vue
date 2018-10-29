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
                    <small>Let your potential customers get to know you better</small>
                </v-stepper-step>
                <v-stepper-content step="2">
                <v-card color="grey lighten-5" class="mb-5" height="200px">
                    <v-card-text>
                        <v-flex xs12 v-if="signedIn">
                            <v-avatar
                            size="38px"
                            color="grey lighten-4">
                                <img :src="$auth.user.picture">
                            </v-avatar>
                            <span class="text-muted font-weight-light px-2">{{$auth.user.name}}</span>                            
                        </v-flex>
                        
                    </v-card-text>

                </v-card>
                <v-btn color="primary" @click="stepState = 3">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="stepState > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

                <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="stepState = 4">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step step="4">View setup instructions</v-stepper-step>
                <v-stepper-content step="4">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
                </v-stepper-content>
            </v-stepper>            

        </v-card>
      </v-dialog>
    </v-layout>
</template>


<script>
export default {
    mounted(){
        this.$nextTick(() => {   

            if(!this.$auth.isAuthenticated()){    

                 
                this.stepState = 1
            } else { 
                var user = JSON.stringify(this.$auth.user)
                console.log('TCL: --------------------------');
                console.log('TCL: mounted -> user', user);
                console.log('TCL: --------------------------');
                this.stepState = 2
            }
        })
    },
    // data() {
    //     return {
    //         // stepState: 1
    //     }
    // },
    computed: {
        dialog: {
            get(){
                return this.$store.getters.showRegisterStall
            },
            set(bool){
                this.$store.dispatch('showRegisterStall', bool)
            }
        },
        signedIn(){
            return this.$auth.isAuthenticated()
        },
        stepState:{
           get(){
               return this.$store.getters.stepState
           },
           set(val){
               this.$store.dispatch('stepState', val)
           }
        }
    },
    methods: {
        signup() {
            this.$auth.login()
            // this.$auth.handleAuthentication().then((data) => {
            // console.log('TCL: -------------------------');
            // console.log('TCL: signup -> data', data);
            // console.log('TCL: -------------------------');
                
            // this.$router.push({ name: 'home' })
            // })
        }
    }
};
</script>
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({ name: 'home' })
    })
  }