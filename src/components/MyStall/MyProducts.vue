<template>
    <div>
      <v-dialog v-model="dialog" persistent max-width="600px">
          <v-btn slot="activator" color="primary" dark>Add a Product</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">Add a Product</span>
            </v-card-title>
            <v-card-text>
              <v-container class="pa-0" grid-list-lg>
                <v-layout row wrap>
                  <v-flex xs12 md6>
                    <v-text-field v-model="product.name" label="Product Name" hint="What are you selling?" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field v-model="product.description" label="Description" hint="Be brief and sell benefits over features."></v-text-field>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-autocomplete
                      :value="product.measurementUnit"
                      :items="['Kilograms', 'Grams', 'Liters', 'Milliliters', 'Dozen', 'Single Item, box or crate etc', 'Not Applicable']"
                      label="Unit of Measure"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field v-model="product.unitsPerItem" label="Units per Item" hint="eg. If you were selling 500ml bottles, then you'd input 500 here."></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field prefix="R" v-model="product.pricePerItem" label="Price per Item" ></v-text-field>
                  </v-flex>                

                      <v-flex xs12>
                        <v-cloudinary-product
                            class="cloudinary-product"
                            :showImage="true"
                            buttonColor="primary"
                            button-icon="fa-camera"
                            buttonText="product image"
                            v-model="productImageId"
                            :upload-preset="cloudinary.preset"
                            :cloud-name="cloudinary.name"
                            @input="gotNewProductImage"
                          />     
                          <v-icon v-if="productImageId" @click="deleteImage">fa-times-circle</v-icon> 
                        
                      </v-flex>
                      

                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn> -->
              <v-btn color="blue darken-1" flat @click="saveProduct">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Product Display -->
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <v-flex xs12 sm6 xl4 v-if="products" v-for="product in products" :key="product.name" >
                  <v-card class="pb-2" hover  height="100%" style="max-height: 70vh"
                  >
                    <v-img    
                    height="70%"      
                      :src="product.image"
                    >
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
    </div>
</template>

<script>
// https://res.cloudinary.com/dylan-van-den-bosch/image/upload/v1543224787/w_auto,h_240,c_fill,g_auto,q_auto,f_auto/Baymax-Action-Figures-Colorful-Light-Cute-Table-Bedroom-Decoration-Amazing-Children-Kids-Girls-Gift.jpg_640x640_ohtj8c.webp
// https://res.cloudinary.com/dylan-van-den-bosch/image/upload/w_auto,h_240,c_fill,g_auto,q_auto,f_auto/cf5agtsap6cun2mvped6

import vuetifyCloudinaryUpload from "vuetify-cloudinary-upload";
import srcForCloudinary from "@/helpers/srcForCloudinary.js";

export default {
  async created() {
    const actionAsyncResponse = this.$store.dispatch(
      "fetchProducts",
      this.stallId
    );
    console.log("​created -> actionAsyncResponse", actionAsyncResponse);
  },
  props: ["stallId"],
  data: () => ({
    dialog: false,
    cloudinary: {
      name: "dylan-van-den-bosch",
      preset: "gi9lyrb6"
    },
    productImageId: null,
    product: {}
  }),
  computed: {
    products() {
      return this.$store.getters.stallProducts;
    }
  },
  methods: {
    gotNewProductImage(e) {
      console.log("TCL: gotImageSource -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSource -> src", src);
      this.product.image = src;
      // this.$store.dispatch("stall", this.stall);
    },
    deleteImage() {
      this.productImageId = null;
    },
    saveProduct() {
      this.$store.dispatch("createProduct", {
        stallId: this.stallId,
        ...this.product
      });
      this.dialog = false;
    }
  },
  components: {
    "v-cloudinary-product": vuetifyCloudinaryUpload
  }
};
</script>

<style scoped>
.cloudinary-product {
  /* position: absolute;
  top: 15vh;
  left: 6vw; */
  z-index: 5;
}
.product-name{
  color: white;
  text-transform: capitalize;
font-variant: small-caps
}
>>>.v-expansion-panel__header {
  padding: 0% !important;

}
</style>




