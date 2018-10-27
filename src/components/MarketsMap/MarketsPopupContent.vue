<template>
  <div>
    <h5 class="headline">
        {{ data.market }} 
    </h5>
    <br>
    <h6 class="title my-input">
      Location Address (by <a :href="data.w3wMapLink" target="blank">what3words</a> ): {{ data.locWords }}
    </h6>
    <br>
    <p>Are you a stall-holder with {{ data.market }}?</p>
    <v-btn block color="accent">Click here to register your stall and get your what3words address.</v-btn>
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
  props: {
    data: {
      type: Object,
      default: () => ({ type: "", color: "#ffffff" })
    }
  }
};
</script>

<style>
.my-input {
  text-transform: thin;
}
</style>
