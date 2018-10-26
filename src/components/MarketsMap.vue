<template>
    <v-container fluid fill-height>
        <v-layout justify-center>
            <v-flex xs12>
                <v-card>
                    <v-card-title class="headline font-weight-light" primary-title>
                        Flea Markets
                    </v-card-title>
                    <v-flex xs10>
                        <v-text-field
                            label="Paste a Google Maps Link here"
                            @change="scrapeLink"
                            name="name"
                            v-model="gmapLink"
                        ></v-text-field>
                    </v-flex>
                    <v-card-text>
                        <l-map ref="MarketsMap" style="height: 70vh; max-width: 80vw" :zoom="map.zoom" :options="map.options"
                        :center="map.center" :min-zoom="map.minZoom" :max-zoom="map.maxZoom" >
                        <l-control-layers :position="map.layersPosition"/>
                        <l-tile-layer v-for="(tileProvider, index) in tileProviders" :key="index"
                            layerType="base" :name="tileProvider.name" :visible="tileProvider.visible"
                            :url="tileProvider.url" :attribution="tileProvider.attribution" :token="token"/>
                        <l-control-zoom :position="map.zoomPosition" />
                        <l-control-attribution :position="map.attributionPosition" :prefix="map.attributionPrefix" />
                        <l-control-scale :imperial="map.imperial" />
                        <l-layer-group v-for="item in stuff" :key="item.id" :visible="item.visible" >
                            <l-layer-group :visible="item.markersVisible" >
                            <MarketsMapMarker
                                v-for="(row, index) in mapData" :key="index"
                                :position="row.gps"
                                :text="row"
                                :title="row.market"
                                >
                            </MarketsMapMarker>
                            <!-- <l-marker v-for="(row, index) in visitData" :key="index"
                                :visible="true" :draggable="false"
                                :lat-lng="row.gps"  @click="alert(row)" /> -->
                            </l-layer-group>
                        </l-layer-group>
                        </l-map>  
                    </v-card-text>
                </v-card>
                
            </v-flex>
        </v-layout>  
    </v-container>
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
    this.$nextTick(() => {
      this.mapObject = this.$refs.MarketsMap.mapObject; // work as expected
      console.log("TCL: mounted -> mapObject", this.mapObject);
      var mapData = this.mapData;
      console.log("TCL: mounted -> mapData", mapData);
    });
  },
  data() {
    return {
      mapObject: null,
      gmapLink: null,
      map: {
        center: { lng: 30.8021097164601, lat: -29.9852711241692 },
        bounds: L.latLngBounds(
          { lat: 46.573931908971865, lng: -4.757080078125001 },
          { lat: 48.850224803672056, lng: 4.603271484375001 }
        ),
        options: { zoomControl: false, attributionControl: false },
        zoom: 10,
        minZoom: 1,
        maxZoom: 20,
        zoomPosition: "topleft",
        attributionPosition: "bottomright",
        layersPosition: "topright",
        attributionPrefix: "Vue2Leaflet",
        imperial: false
      },

      opacity: 0.6,
      token: "your token if using mapbox",

      Positions: ["topleft", "topright", "bottomleft", "bottomright"],
      tileProviders: tileProviders,
      stuff: [{ id: "s1", visible: true, markersVisible: true }]
    };
  },
  computed: {
    mapData() {
      return this.$store.getters.mapData;
    }
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
    }
  },
  watch: {
    mapData(newVal) {
      console.log("TCL: mapData -> newVal", newVal);
    }
  }
};
</script>