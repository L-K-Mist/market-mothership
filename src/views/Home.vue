<template>
<div>
    <v-container>
          <v-layout row >
            <v-flex xs12>
              <!-- <my-stall  v-if="hasStall"></my-stall> -->
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header">Map Of Markets</div>

              <MarketsMap />
                </v-expansion-panel-content>
              </v-expansion-panel>
              <RegisterStall/>

            </v-flex>
          </v-layout>  
            <v-layout row>
              <v-container align-baseline grid-list-md>
                <v-list three-line>
                    <v-list-tile @click="goToDetail(item.id)"
                    v-for="(item) in stalls" :key="item.id"
                      avatar
                    >
                      <v-list-tile-avatar>
                        <img :src="item.image">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="item.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                </v-list>
              </v-container>
            </v-layout>
    </v-container>
</div>
</template>

<script>
import MarketsMap from "../components/MarketsMap";
import RegisterStall from "@/components/RegisterStall";
// import MyStall from '@/components/MyStall'

export default {
  async created() {
    var stalls = await this.fetchStalls();
    console.log("​created -> stalls", stalls);
  },
  computed: {
    hasStall() {
      return this.$store.getters.hasStall;
    },
    stalls() {
      return this.$store.getters.stalls;
    }
  },
  methods: {
    fetchStalls() {
      this.$store.dispatch("fetchStalls"); //SomedayMaybe: Use infinite-scroll here.
    },
    goToDetail(id) {
      console.log("​goToDetail -> id", id);
      this.$router.push({ name: "stall-details", params: { Sid: id } });
    }
  },
  components: {
    MarketsMap,
    RegisterStall
    // MyStall
  }
};
</script>
ias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    MarketsMap
  }
}
</script>
