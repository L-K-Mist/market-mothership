<template>
  <div>
    <h6 class="subheading">
        {{ data.name }} 
    </h6>
  
    <p class="body-2 my-input">
      Location Address (by <a :href="data.w3wMapLink" target="blank">what3words</a> ): <span style="color: blue">{{ data.w3w }}</span>
    </p>
  
    <p>Are you a stall-holder with {{ data.name }}? Go on, put yourself on the MAP! </p>
    <v-btn @click="showDialog" block color="accent">Register Your Stall</v-btn>
    <v-img
      :src="`https://res.cloudinary.com/dylan-van-den-bosch/image/upload/w_auto,h_400/FoodStall_msltmd.jpg`"

    class="grey lighten-2"
  >
    <v-layout
      slot="placeholder"
      fill-height
      align-center
      justify-center
      ma-0
    >
      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
    </v-layout>
  </v-img>
  </div>
</template>

<script>
export default {
  name: "PopupContent",
  mounted(){
    // Didn't work gonna have to get into leaflet refs
    // var openPopup = this.data.name
    // console.log('TCL: ------------------------------------');
    // console.log('TCL: mounted -> openPopup', openPopup);
    // console.log('TCL: ------------------------------------');
  },
  props: {
    data: {
      type: Object,
      default: () => ({ type: "", color: "#ffffff" })
    },
    market: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    showDialog() {
      this.$store.dispatch("personMarket", this.data.name);
      this.$store.dispatch("showRegisterStall", true);
    }
  }
};
</script>

<style>
.my-input {
  text-transform: thin;
}
</style>
