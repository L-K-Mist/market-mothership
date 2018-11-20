<template>
    <div>            
        <v-flex v-if="person.loginDataReceived" xs12>
            <v-avatar
            size="38px"
            color="grey lighten-4">
                <img :src="person.image">
            </v-avatar>
            <v-cloudinary-user

              class="cloudinary-user"
              :showImage="false"
              buttonColor="primary"
              button-icon="fa-camera"
              buttonText="change image"
              v-model="avatarImageId"
              :upload-preset="cloudinary.preset"
              :cloud-name="cloudinary.name"
              @input="gotNewAvatar"
            />    
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
            <v-textarea
                label="Bio"
                hint="If you knew me well, you'd know..."
                v-model="person.bio"
            ></v-textarea>
                                
        </v-flex>
        <v-btn color="primary" @click="bioDone()">Continue</v-btn>
    </div>
</template>
<script>
import vuetifyCloudinaryUpload from "vuetify-cloudinary-upload";
import srcForCloudinary from "@/helpers/srcForCloudinary.js";

export default {
  mounted() {
    // this.$nextTick(() => {

    //   })
    this.person.publicEmail = this.person.email;
    this.person.publicName = this.person.firstName;
    console.log("​-------------------------------------------------------");
    console.log(
      " Stallholder form ​mounted -> this.person.firstName",
      this.person.firstName
    );
    console.log("​-------------------------------------------------------");
  },
  data() {
    return {
      publicEmail: "",
      publicName: "",
      cloudinary: {
        name: "dylan-van-den-bosch",
        preset: "gi9lyrb6"
      },
      avatarImageId: null
    };
  },
  computed: {
    person: {
      get() {
        return this.$store.getters.person;
      },
      set(val) {
        this.$store.dispatch("personFormData", val);
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
    bioDone() {
      this.$store.dispatch("personFormData", this.person);
      this.$emit("done");
    },
    gotNewAvatar(e) {
      console.log("TCL: gotImageSource -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSource -> src", src);
      this.person.image = src;
      this.$store.dispatch("personFormData", this.person);
    }
    // updatePerson() {
    //   // Want email to stay Auth0 email even though user might choose a different one here in the bio for actual contact
    //   this.$store.dispatch
    // }
  },
  components: {
    "v-cloudinary-user": vuetifyCloudinaryUpload
  }
};
</script>
