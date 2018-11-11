<template>
    <div>            
        <v-flex v-if="person.loginDataReceived" xs12>
            <v-avatar
            size="38px"
            color="grey lighten-4">
                <img :src="person.image">
            </v-avatar>
            <v-text-field
                label="First Name"
                hint="The name you're best known by."
                v-model="person.publicName"
            ></v-text-field>     
            <v-text-field
                label="Last Name"
                hint="Yip, AKA Surname."
                v-model="person.lastName"
            ></v-text-field>
            <v-text-field
                label="Cell"
                hint="Optional, but nice for business"
                v-model="person.cell"
            ></v-text-field>               
            <v-text-field
                label="Email"
                hint="Choose the email address you want use for customer interaction"
                v-model="person.publicEmail"
            ></v-text-field>
            <v-text-field multi-line
                label="Bio"
                hint="If you knew me well, you'd know..."
                v-model="person.bio"
            ></v-text-field>
                                
        </v-flex>
        <v-btn color="primary" @click="bioDone()">Continue</v-btn>
    </div>
</template>
<script>
export default {
  mounted() {
    // this.$nextTick(() => {
      
    //   })
      this.person.publicEmail = this.person.email;
      this.person.publicName = this.person.firstName
			console.log("​-------------------------------------------------------")
			console.log(" Stallholder form ​mounted -> this.person.firstName", this.person.firstName)
			console.log("​-------------------------------------------------------")
  },
  data() {
    return {
      publicEmail: "",
      publicName: ""
    };
  },
  computed: {
    person: {
      get() {
        return this.$store.getters.person;
      },
      set(val) {
        this.$store.dispatch('personFormData', val)
      }
      //   publicEmail() {
      //     return this.person.email;
      //   }
      //   set(val) {
      //     // this.$store.dispatch("personFormData", val)
      //   }
    }
  },
  methods: {
    bioDone(){
      this.$emit('done')

    }
    // updatePerson() {
    //   // Want email to stay Auth0 email even though user might choose a different one here in the bio for actual contact
    //   this.$store.dispatch
    // }
  }
};
</script>
