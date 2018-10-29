<template>
  <l-marker :lat-lng="position" :title="title" :draggable="false">
    <l-popup :options="{minWidth: popupWidth}">
      <markets-popup-content :data="text"/>
    </l-popup>
  </l-marker>
</template>

<script>
import { LMarker, LPopup } from "vue2-leaflet";
import MarketsPopupContent from "@/components/MarketsMap/MarketsPopupContent";

export default {
  name: "MarkerPopup",
  components: {
    LMarker,
    LPopup,
    MarketsPopupContent
  },
  props: ["text", "position", "title", "market"],
  computed: {
    popupWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 300;
        case "md":
          return 400;
        case "lg":
          return 600;
        case "xl":
          return 800;
      }
    }
  },
  watch: {
    popupWidth(newVal) {
      console.log("TCL: ---------------------------------");
      console.log("TCL: popupWidth -> newVal", newVal);
      console.log("TCL: ---------------------------------");
    }
  }
};
</script>