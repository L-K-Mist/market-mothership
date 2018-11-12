<template>
<div>

    <!-- <v-container fluid fill-height> -->
        <v-layout justify-center>
            <v-flex xs12>
              <!-- <my-stall  v-if="hasStall"></my-stall> -->
              <MarketsMap />
              <RegisterStall/>

            </v-flex>
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
  components: {
    MarketsMap,
    RegisterStall
    // MyStall
  },
  computed: {
    hasStall() {
      return this.$store.getters.hasStall;
    }
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
