<template>
<div>

    <!-- <v-container fluid fill-height> -->
        <v-layout justify-center>
            <v-flex xs12>
              <!-- <my-stall  v-if="hasStall"></my-stall> -->
              <MarketsMap />
              <RegisterStall/>

            </v-flex>
            <v-container grid-list-md>
              <v-list three-line>
                <template v-for="(item, index) in stalls">
                  <v-subheader
                    v-if="item.header"
                    :key="item.header"
                  >
                    {{ item.header }}
                  </v-subheader>

                  <v-divider
                    v-else-if="item.divider"
                    :inset="item.inset"
                    :key="index"
                  ></v-divider>

                  <v-list-tile
                    v-else
                    :key="item.title"
                    avatar
                  >
                    <v-list-tile-avatar>
                      <img :src="item.avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
              
            </v-container>
        </v-layout>  
    <!-- </v-container> -->

</div>
</template>

<script>
// TODO: Add the markets from laptop to db
import MarketsMap from "../components/MarketsMap";
import RegisterStall from "@/components/RegisterStall";
// import MyStall from '@/components/MyStall'

export default {
  created() {
    this.fetchStalls();
  },
  computed: {
    hasStall() {
      return this.$store.getters.hasStall;
    }
  },
  methods: {
    fetchStalls() {
      this.$store.dispatch("fetchStalls"); //SomedayMaybe: Use infinite-scroll here.
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
