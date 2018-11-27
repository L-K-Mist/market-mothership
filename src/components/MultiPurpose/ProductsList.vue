<template>
    <v-container grid-list-md fluid>
        <v-layout row wrap>
            <v-flex xs12 sm6 lg4 v-if="products" v-for="product in products" :key="product.name" >
                <product-form :product="product" :show="dialog" @showForm="showForm" 
                @productData="updateProduct">
                    <slot name="cloudinary-edit-instruction" slot="edit-instruction">
                    </slot>          
                </product-form>
                <v-card class="pb-2" hover  height="100%" style="max-height: 70vh; cursor: default"
                >
                <v-img    
                height="70%"      
                    :src="product.image"
                >
                <v-icon v-if="editMode" @click="activeProduct = product.id; dialog = true" large dark 
                style="position: absolute; bottom: 1%; right: 1%">fa-edit</v-icon>
                        <v-flex xs12>
                        <strong class="display-1 font-weight-black product-name text-shadow">{{ product.name }}</strong>
                        </v-flex>
                </v-img>
                <!-- <v-card-title> -->
                    <v-expansion-panel class="pl-1" style="position: absolute; top: 70%; max-width: 98% " popout>
                    <v-expansion-panel-content style="z-index: 12" class="pa-1 ma-1">
                        <div slot="header" class="grey--text ma-1 pa-1" >Details</div>
                        <v-card>
                        <v-card-text>
                            {{product.description}}
                        </v-card-text>
                        </v-card>
                        <!-- <span></span><br> -->
                    </v-expansion-panel-content>

                    </v-expansion-panel><br><br><br><br>
                    <!-- <v-flex>
                    <span >Details</span><br>
                    <span>{{product.description}}</span><br>
                    
                    </v-flex> -->
                <!-- </v-card-title> -->
                <v-layout row align-end>
                    <v-card-text style="position: absolute; bottom: 0px; z-index: 3" >
                        R {{(product.pricePerItem.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                }))}} 
                    <span class="caption" v-if="product.unitsPerItem && product.measurementUnit">for {{ product.unitsPerItem }} {{ product.measurementUnit }}</span>
                    <span v-else>each</span> 
                    </v-card-text>
                </v-layout>
                <!-- <v-card-actions>
                    <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions> -->
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import ProductForm from "@/components/MultiPurpose/ProductForm";

export default {
  props: {
    products: {
      default() {
        return {};
      }
    },
    editMode: {
      default: false
    }
  },
  data() {
    return {
      activeProduct: null,
      dialog: false
    };
  },
  methods: {
    updateProduct(product) {
      this.$store.dispatch("updateProduct", {
        productId: this.activeProduct,
        ...product
      });
    },
    showForm(bool) {
      this.dialog = bool;
    }
  },
  components: {
    ProductForm
  }
};
</script>

<style scoped>
.product-name {
  color: white;
  text-transform: capitalize;
  font-variant: small-caps;
}
>>> .v-expansion-panel__header {
  padding: 0% !important;
}
</style>



