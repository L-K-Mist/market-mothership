<template>
  <l-marker :lat-lng="position" :title="title" :draggable="false">
    <l-popup :options="{minWidth: 800}">
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
  props: ["text", "position", "title"]
};
</script>