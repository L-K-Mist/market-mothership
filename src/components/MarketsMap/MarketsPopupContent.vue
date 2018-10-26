<template>
  <div>
    <h4 class="headline">
        {{ data.market }}

    </h4>
    <br>
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