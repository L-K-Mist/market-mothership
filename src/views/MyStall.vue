<template>
    <v-container grid-list-xs>
        <transition 
        class="elevation-24"
          enter-active-class="animated bounceInRight"
          leave-active-class="animated hinge fast"
          >
          <v-cloudinary-user
            v-if="changeAvatar" 
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
        </transition>
        <transition 
        class="elevation-24"
          enter-active-class="animated bounceInLeft"
          leave-active-class="animated hinge fast"
          >
          <v-cloudinary-stall
            v-if="changeStallImage" 
              class="cloudinary-stall"
              :showImage="false"
              buttonColor="primary"
              button-icon="fa-camera"
              buttonText="change image"
              v-model="stallImageId"
              :upload-preset="cloudinary.preset"
              :cloud-name="cloudinary.name"
              @input="gotNewStallImage"
            />               
        </transition>        
        <v-layout column justify-center>
            <v-card>
                <v-img :aspect-ratio="16/9" class="background-image pb-6" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
                    <v-container grid-list-md>
                      <v-layout  v-if="stallHolder" pa-2 column fill-height class="lightbox white--text">
<!-- Useravatar -->
                        <v-flex id="avatar-w-info" class="stallHolderPic">
                            <v-avatar @click="toggle('changeAvatar')" class="avatar-only elevation-12"
                            size="20vw"
                            color="grey lighten-4"
                            >
                                <img v-if="stallHolder.image" :src="stallHolder.image"/>
                                <v-icon v-else size="17vw">fa-user</v-icon>
                            </v-avatar>
                            <div class="contact-wrapper text-shadow">
                                <div class="subheading">{{stallHolder.publicName}}</div>
                                <div class="body-1">{{stallHolder.publicEmail}}</div>
                                <div v-if="stallHolder.cell" class="body-1">{{stallHolder.cell}}</div>
                            </div>
                        </v-flex>
                        <v-flex xs8>
                          <img  @click="toggle('changeStallImage')" class="stall-image" :src="stallHolder.stall.image" alt="image of shop"/>
                        </v-flex>
                        <v-layout row>
                          <v-flex xs12 >
                              <h3 class="stall-name text-shadow">{{stallHolder.stall.name}}</h3>
                          </v-flex>                          
                        </v-layout>
                      </v-layout>
                      <v-progress-circular v-else color="indigo" indeterminate :size="200" :width="16"></v-progress-circular>
<!-- CHANGE AVATAR DIALOG -->
                    </v-container>
                </v-img>
            </v-card>
            <!-- <router-view></router-view> -->
            <stall-basic-profile :stall="stallWithOwner">
              <v-dialog v-model="dialog" max-width="500px">
                  <v-btn 
                    style="position: absolute; top: 5px; right: 5px"
                    color="primary" 
                    icon flat dark 
                    slot="activator"
                    >
                      <v-icon medium>fa-edit</v-icon>
                  </v-btn>
                  <my-stall-edit :stall="stallWithOwner"></my-stall-edit>
              </v-dialog>
            </stall-basic-profile>
          <v-layout row justify-center>
        </v-layout> 
            <!-- <my-stall-profile :stallHolder="stallHolder" :stall="stall"></my-stall-profile> -->
            <my-products v-if="stallHolder.stall.id" :stallId="stallHolder.stall.id"></my-products>
        </v-layout>
    </v-container>
</template>
<script>
import vuetifyCloudinaryUpload from "vuetify-cloudinary-upload";
import srcForCloudinary from "@/helpers/srcForCloudinary.js";
import StallBasicProfile from "@/components/MultiPurpose/StallBasicProfile";
import MyProducts from "@/components/MyStall/MyProducts";
import MyStallEdit from "@/components/MyStall/MyStallEdit";

export default {
  created() {},
  async mounted() {
    if (this.$store.getters.isPrismaAuth) {
      console.log(
        "MyStall knows prisma auth is: (true)",
        this.$store.getters.isPrismaAuth
      );
      this.$store.dispatch("fetchMe");
      this.$store.dispatch("fetchMyStall");
    } else {
      console.log(
        "MyStall knows prisma auth is: (false)",
        this.$store.getters.isPrismaAuth
      );

      await this.$store.dispatch("prismaAuth");
      console.log(
        "it has waited for prismaAuth to return and now dispatching fetchMe and fetchMyStall"
      );
      this.$store.dispatch("fetchMe");
      this.$store.dispatch("fetchMyStall");
    }
    // console.log("​mounted -> me", me);
  },
  data() {
    return {
      changeAvatar: false,
      changeStallImage: false,
      cloudinary: {
        name: "dylan-van-den-bosch",
        preset: "gi9lyrb6"
      },
      avatarImageId: null,
      stallImageId: null,
      dialog: false
    };
  },
  computed: {
    stallHolder: {
      get() {
        return this.$store.getters.stallHolder;
      },
      set(val) {
        this.$store.dispatch("stallHolder", val);
      }
    },
    // stall: {
    //   get() {
    //     return this.$store.getters.stall;
    //   },
    //   set(val) {
    //     this.$store.dispatch("stall", val);

    //     // this.$store.dispatch("fetchMyStall");
    //   }
    // },
    stallWithOwner() {
      // TODO get rid of this KISS
      var stall = this.stallHolder.stall;
      stall.owner = this.stallHolder;
      return stall;
    },

    stallImage() {
      // if go with both then remove
      if (this.stallHolder.stall.image) {
        return this.stallHolder.stall.image;
      } else if (!this.stallHolder.stall.image) {
        return "https://cdn.vuetifyjs.com/images/parallax/material.jpg";
      }
    }
  },
  methods: {
    gotNewAvatar(e) {
      console.log("TCL: gotImageSource -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSource -> src", src);
      this.stallHolder.image = src;
      this.$store.dispatch("stallHolder", this.stallHolder);
      this.$store.dispatch("updateStallHolder", {
        id: this.stallHolder.id,
        image: this.stallHolder.image
      });
    },
    gotNewStallImage(e) {
      console.log("TCL: gotImageSource -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSource -> src", src);
      this.stall.image = src;
      this.$store.dispatch("stallHolder", this.stallHolder);
      this.$store.dispatch("updateStall", {
        stallId: this.stall.id,
        image: this.stall.image
      });
    },
    toggle: function(boolItemAsString) {
      console.log("​created -> boolItemAsString", boolItemAsString);
      this[boolItemAsString] = !this[boolItemAsString];
    }
  },
  components: {
    "v-cloudinary-user": vuetifyCloudinaryUpload,
    "v-cloudinary-stall": vuetifyCloudinaryUpload,
    StallBasicProfile,
    MyProducts,
    MyStallEdit
  }
};
</script>
<style scoped>
.stallHolderPic {
  position: absolute;
  right: 1vw;
  top: 5vw;
  cursor: pointer;
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
/* start of animation css */
/* .slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 1.5s;
}

.slide-leave {
}

.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
} */

@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0px);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(20px);
  }
}
</style>


