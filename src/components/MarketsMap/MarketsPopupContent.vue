<template>
  <div>
    <h6 class="subheading">
        {{ data.name }} 
    </h6>
  
    <p class="body-2 my-input">
      Location Address (by <a :href="'http://w3w.co/' + data.w3w" target="blank">what3words</a> ): <span style="color: blue">{{ data.w3w }}</span>
    </p>
  
    <p>Are you a stall-holder with {{ data.name }}? Go on, put yourself on the MAP! </p>
    <v-btn @click="showDialog" block color="accent">Register Your Stall</v-btn>
    <v-img v-if="data.image"
      :src="data.image"

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
  mounted() {
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
      this.$store.dispatch("showRegisterStall", {
        show: true,
        forMarket: this.data.name
      });
    }
  }
};
</script>

<style>
.my-input {
  text-transform: thin;
}
</style>
