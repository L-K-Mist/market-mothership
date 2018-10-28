<template>
<div>

    <!-- <v-container fluid fill-height> -->
        <v-layout justify-center>
            <v-flex xs12>
              <MarketsMap />
              <RegisterStall/>
            </v-flex>
        </v-layout>  
    <!-- </v-container> -->

</div>
</template>

<script>
import MarketsMap from "../components/MarketsMap";
import RegisterStall from '@/components/RegisterStall';

export default {
  components: {
    MarketsMap,
    RegisterStall
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
