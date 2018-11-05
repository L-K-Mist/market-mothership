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
        <v-btn color="primary" @click="$emit('gotBio', person)">Continue</v-btn>
    </div>
</template>
<script>
export default {
  computed: {
    person: {
      get() {
        return this.$store.getters.person;
      },
      set(val) {
        // this.$store.dispatch("personFormData", val)
      }
    }
  },
  methods: {}
};
</script>
