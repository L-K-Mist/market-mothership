<template>
    <v-container grid-list-xs>
        <v-layout column justify-center>
            <v-card v-if="stallHolder">
                <v-img :aspect-ratio="16/9" class="stall-image" :src="stallImage">
                    <v-layout pa-2 column fill-height class="lightbox white--text">
                    <v-spacer></v-spacer>
                    <v-flex class="stallHolderPic">
                        <v-avatar class="elevation-12 border"
                        size="200px"
                        color="grey lighten-4"
                        >
                            <img v-if="stallHolder.image" :src="stallHolder.image"/>
                            <v-icon v-else size="150">fa-user</v-icon>
                        </v-avatar>
                        <div class="contact-wrapper text-shadow">
                            <div class="subheading">{{stallHolder.publicName}}</div>
                            <div class="body-1">{{stallHolder.publicEmail}}</div>
                            <div v-if="stallHolder.cell" class="body-1">{{stallHolder.cell  }}</div>
                        </div>
                    </v-flex>
                    <v-flex >
                        <h3 class="stall-name text-shadow">{{stall.name}}</h3>
                    </v-flex>
                    </v-layout>
                </v-img>
            </v-card>
            <v-progress-circular v-else color="indigo" indeterminate :size="200" :width="16"></v-progress-circular>      
        </v-layout>
    </v-container>
</template>
<script>
// TODO NEXT: solve the stallImage issue
export default {
  created() {},
  mounted() {
    this.$store.dispatch("fetchMyStall");
  },
  data() {
    return {};
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
    stall: {
      get() {
        return this.$store.getters.stall;
      },
      set(val) {
        this.$store.dispatch("stall", val);
      }
    },
    stallImage() {
      if (this.stall.image) {
        return this.stall.image;
      } else if (!this.stall.image) {
        return "https://cdn.vuetifyjs.com/images/parallax/material.jpg";
      }
    }
  }
};
</script>
<style scoped>
.stallHolderPic {
  position: absolute;
  right: 10px;
  top: 30;
}
.contact-wrapper {
  background-blend-mode: hue;
}
.stall-image {
  filter: grayscale(0.5);
}
.stall-name {
  color: lightgrey;
  font-size: 6vw;
  mix-blend-mode: darken;
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
</style>


