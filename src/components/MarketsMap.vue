<template>
  <v-card>
      <v-card-title class="headline font-weight-light" primary-title>
          Flea Markets
      </v-card-title>

      <!-- <v-flex xs10>
          <v-text-field
              label="Paste a Google Maps Link here"
              @change="scrapeLink"
              name="name"
              v-model="gmapLink"
          ></v-text-field>
      </v-flex> -->
      <v-btn @click="findMe()" color="success">Find Me</v-btn>
      <v-card-text>
          <l-map id="map" ref="MarketsMap" style="height: 70vh; max-width: 98vw" :zoom="map.zoom" :options="map.options"
          :center="map.center" :min-zoom="map.minZoom" :max-zoom="map.maxZoom" 
          @locationfound="onLocataionFound($event)">
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
                  :text="row"
                  >
              </MarketsMapMarker>
              <template v-if="meMarker.length > 0">

              </template>
                <l-marker v-for="marker in meMarker" :key="marker.name"
                  :ref="'meMarker'" :lat-lng="marker.position" title="title" :draggable="true">
                  <!-- <l-popup  :ref="'popup' + text.name" :options="{maxWidth: popupWidth, closeButton: true}">
                    <markets-popup-content :data="text"/>
                  </l-popup> -->
                </l-marker>
              <!-- <l-marker v-for="(row, index) in visitData" :key="index"
                  :visible="true" :draggable="false"
                  :lat-lng="row.gps"  @click="alert(row)" /> -->
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
  LMarker,
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
    LMarker,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers,
    MarketsMapMarker
  },
  mounted() {
    var markets = this.$store.getters.markets.map(function(market){
      return {
      ...market,
        show : true
      }
    })
    this.markets = markets
      console.log('TCL: ------------------------------------------');
      console.log('TCL: mounted -> markets', markets);
      console.log('TCL: ------------------------------------------');


    

    this.$nextTick(() => {
      this.mapObject = this.$refs.MarketsMap.mapObject; // work as expected
      console.log("TCL: mounted -> mapObject", this.mapObject);
    });
  },
  data() {
    return {
      meMarker: [],
      value: true,
      markets: [],
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
        attributionPrefix: "Vue2Leaflet and What3Words... you ROCK!!!",
      },
      opacity: 0.6,
      tileProviders: tileProviders,
      stuff: [{ id: "s1", visible: true, markersVisible: true }]
    };
  },
  computed: {
    mapData() {
      return this.$store.getters.mapData;
    },
    // markets() {
      
    //   return this.$store.getters.markets
    // }

    // showMap() {
    //   return this.$store.getters.showMap;
    // }
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
      this.mapObject.locate({setView: true, maxZoom: 16});

    },
    onLocataionFound(e){
    console.log('TCL: -----------------------------------------------------------');
    console.log('TCL: onLocataionFound -> onLocataionFound', e.accuracy);
    console.log('TCL: -----------------------------------------------------------');
        var radius = e.accuracy / 2;
            const newMarker = { position: e.latlng, draggable: true, visible: true };
      this.meMarker.push(newMarker);
    // L.marker(e.latlng).addTo(map)
    //     .bindPopup("You are within " + radius + " meters from this point").openPopup();

    // L.circle(e.latlng, radius).addTo(map);
      
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
