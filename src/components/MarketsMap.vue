<template>
  <v-card>
      <v-card-title class="headline font-weight-light pt-1" primary-title>
          Flea Markets
      </v-card-title>
      <v-card-text class="pt-0">
          <l-map id="map" ref="MarketsMap" style="height: 85vh; max-width: 98vw" :zoom="map.zoom" :options="map.options"
          :center="map.center" :min-zoom="map.minZoom" :max-zoom="map.maxZoom" >
          <l-control-scale position="bottomleft" :imperial="false" />
          <l-control-layers :options="{position: map.layersPosition}" />
          <l-tile-layer v-for="(tileProvider, index) in tileProviders" :key="index"
              layerType="base" :name="tileProvider.name" :visible="tileProvider.visible"
              :url="tileProvider.url" :attribution="tileProvider.attribution"/>
          <l-control-zoom position="bottomleft" />
          <l-control-attribution position="bottomright" :prefix="map.attributionPrefix" />
          <l-layer-group v-for="item in stuff" :key="item.id" :visible="item.visible" >
              <l-layer-group :visible="item.markersVisible" >
              <MarketsMapMarker 
                  v-for="row in markets" :key="row.name"
                  :position="{lat: row.lat, lng: row.lng}"
                  :text="row"/>
              </l-layer-group>
          </l-layer-group>
          </l-map>  
      </v-card-text>
  </v-card>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LLayerGroup,
  LTooltip,
  LControlZoom,
  LControlAttribution,
  LControlScale,
  LControlLayers
} from "vue2-leaflet";
import MarketsMapMarker from "@/components/MarketsMap/MarketsMapMarker";
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

export default {
  name: "example",
  components: {
    LMap,
    LTileLayer,
    LLayerGroup,
    LTooltip,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers,
    MarketsMapMarker
  },
  mounted() {
    this.$store.dispatch("fetchMarkets");

    this.$nextTick(() => {
      this.mapObject = this.$refs.MarketsMap.mapObject; // work as expected
      console.log("TCL: mounted -> mapObject", this.mapObject);
    });
  },
  data() {
    return {
      value: true,
      // markets: [],
      mapObject: null,
      gmapLink: null,
      startCenter: { lng: 30.8021097164601, lat: -29.9852711241692 },
      map: {
        center: { lng: 30.8021097164601, lat: -29.9852711241692 },
        bounds: L.latLngBounds(
          { lat: 46.573931908971865, lng: -4.757080078125001 },
          { lat: 48.850224803672056, lng: 4.603271484375001 }
        ),
        options: { zoomControl: false, attributionControl: false },
        zoom: 10,
        minZoom: 1,
        maxZoom: 19,
        layersPosition: "bottomleft",
        attributionPrefix: "Vue2Leaflet and What3Words... you ROCK!!!"
      },
      opacity: 0.6,
      tileProviders: tileProviders,
      stuff: [{ id: "s1", visible: true, markersVisible: true }]
    };
  },
  computed: {
    markets() {
      var markets = this.$store.getters.markets.map(function(market) {
        return {
          ...market,
          show: true
        };
      });

      return markets;
    }
  },
  methods: {
    alert(item) {
      alert("this is " + JSON.stringify(item));
    },
    scrapeLink(e) {
      console.log("dispatched scrapeLink");
      this.$store.dispatch("scrapeLink", this.gmapLink);
      this.gmapLink = null;
    },
    findMe() {
      this.mapObject.locate({ setView: true, maxZoom: 16 });
    }
  },
  watch: {
    mapData(newVal) {
      console.log("TCL: mapData -> newVal", newVal);
    }
  }
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
