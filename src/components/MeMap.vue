<template>
  <v-card v-if="map !== 'undefined'">
      <v-card-title class="headline font-weight-light" primary-title>
          Mark My Stall
        {{map.zoom}} {{map.center}}

      </v-card-title>
      <v-card-text>
          <l-map id="MeMap" ref="MeMap" style="height: 70vh; max-width: 98vw" :zoom="map.zoom" :options="map.options"
          :center="map.center" :min-zoom="map.minZoom" :max-zoom="map.maxZoom" 
          @locationfound="onLocationFound($event)">
          <l-control-scale position="bottomleft" :imperial="false" />
          <l-control-layers :options="{position: map.layersPosition}" />
          <l-tile-layer v-for="(tileProvider, index) in tileProviders" :key="index"
              layerType="base" :name="tileProvider.name" :visible="tileProvider.visible"
              :url="tileProvider.url" :attribution="tileProvider.attribution"/>
          <l-control-zoom position="bottomleft" />
          <l-control-attribution position="bottomright" :prefix="map.attributionPrefix" />
                <l-marker v-if="meMarker"
                  :ref="'MeMarker'" :lat-lng="meMarker.position" title="My Position" :draggable="true">
                </l-marker>
                <l-circle v-if="meCircle" :lat-lng="meCircle.coords"
                    :radius="meCircle.radius"
                    :opacity=".2"
                />
          </l-map>  
      </v-card-text>
  </v-card>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LTooltip,
  LMarker,
  LCircle,
  LControlZoom,
  LControlAttribution,
  LControlScale,
  LControlLayers
} from "vue2-leaflet";
import Glyph from "leaflet.icon.glyph";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import tileProviders from "@/helpers/tileProviders.js";

//
var customIcon = L.icon({
  iconUrl: "images/layers.png",
  shadowUrl: ""
});

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
export default {
  name: "example",
  components: {
    LMap,
    LTileLayer,
    LTooltip,
    LMarker,
    LCircle,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers
  },
  mounted() {
    var that = this;
    this.$nextTick(() => {
      console.log(this.$refs);
      this.mapObj = this.$refs.MeMap.mapObject;
    });
    this.findMe();
  },
  data() {
    return {
      meMarker: null,
      meCircle: null,
      mapObj: null,
      startCenter: { lng: 30.8021097164601, lat: -29.9852711241692 },
      map: {
        center: { lng: 30.8021097164601, lat: -29.9852711241692 },
        options: { zoomControl: false, attributionControl: false },
        zoom: 10,
        minZoom: 1,
        maxZoom: 20,
        layersPosition: "bottomleft",
        attributionPrefix: "Vue2Leaflet and What3Words... you ROCK!!!"
      },
      opacity: 0.6,
      tileProviders: tileProviders,
      stuff: [{ id: "s1", visible: true, markersVisible: true }]
    };
  },
  computed: {},
  methods: {
    async findMe() {
      await sleep(2000);

      this.mapObj.locate({ setView: true, maxZoom: 3 });
      console.log("TCL: asyncfindMe -> this.mapObj", this.mapObj);
    },
    onLocationFound(e) {
      console.log(
        "TCL: -----------------------------------------------------------"
      );
      console.log("TCL: onLocataionFound -> onLocataionFound", e.accuracy);
      console.log(
        "TCL: -----------------------------------------------------------"
      );
      var radius = e.accuracy / 2;
      const newMarker = { position: e.latlng, draggable: true, visible: true };
      this.meMarker = newMarker;
      // L.marker(e.latlng).addTo(map)
      //     .bindPopup("You are within " + radius + " meters from this point").openPopup();
      this.meCircle = {
        coords: e.latlng,
        radius
      };
    }
  },
  watch: {}
};
</script>

<style>
#map {
  z-index: 1;
}

/* .ui-dialog {
    z-index: 2;
} */
</style>
