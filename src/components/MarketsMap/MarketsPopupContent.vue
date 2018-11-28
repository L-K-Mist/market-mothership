<template>
  <div>
    <!-- <h6 class="subheading">
        {{ data.name }} 
    </h6> -->
  
  
    <v-img v-if="data.image"
      :src="data.image"

    class="grey lighten-2"
  >
    <v-flex class="ml-2" xs12>
      <strong class="display-1 font-weight-black product-name text-shadow">{{ data.name }}</strong>
    </v-flex>
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
    <p class="body-2 my-input">
      Location Address (by <a :href="'http://w3w.co/' + data.w3w" target="blank">what3words</a> ): <span style="color: blue">{{ data.w3w }}</span>
    </p>
    <v-layout row>
      <v-flex xs7>
        <p>Are you a stall-holder with {{ data.name }}? Go on, put yourself on the MAP!</p>
        
      </v-flex>
      <v-flex xs5 style="position: relative; top: 20px">
        <v-btn @click="showDialog" small color="accent">Register</v-btn>
      </v-flex>      
    </v-layout>
  
    
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
.product-name {
  color: white;
  text-transform: capitalize;
  font-variant: small-caps;
}
.text-shadow {
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
}
</style>
