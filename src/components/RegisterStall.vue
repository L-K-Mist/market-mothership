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
                <v-stepper-step :complete="stepState > 1" step="1">
                Select an app
                <small>Summarize if needed</small>
                </v-stepper-step>

                <v-stepper-content step="1">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="stepState = 2">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="stepState > 2" step="2">Configure analytics for this app</v-stepper-step>

                <v-stepper-content step="2">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
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
                <v-btn color="primary" @click="stepState = 1">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
                </v-stepper-content>
            </v-stepper>            

        </v-card>
      </v-dialog>
    </v-layout>
</template>


<script>
export default {
    data() {
        return {
            stepState: 1
        }
    },
    computed: {
        dialog: {
            get(){
                return this.$store.getters.showRegisterStall
            },
            set(bool){
                this.$store.dispatch('showRegisterStall', bool)
            }
        }
    }
};
</script>
