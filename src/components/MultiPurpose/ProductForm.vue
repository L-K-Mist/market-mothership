<template>
          <v-dialog v-model="dialog" max-width="600px">

          <v-card v-if="product">
            <v-card-title>
              <span class="headline">Add a Product</span>
            </v-card-title>
            <v-card-text>
              <v-container class="pa-0" grid-list-lg>
                <v-layout row wrap>
                  <v-flex xs12 md6>
                    <v-text-field v-model="newData.name" label="Product Name" hint="What are you selling?" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field v-model="newData.description" label="Description" hint="Be brief and sell benefits over features."></v-text-field>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-autocomplete measurementUnit
                      v-model="newData.measurementUnit"
                      :items="['Single Item, box or crate etc', 'Kilograms', 'Grams', 'Liters', 'Milliliters', 'Dozen', 'Not Applicable']"
                      label="Unit of Measure"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field v-model="newData.unitsPerItem" label="Units per Item" hint="eg. If you were selling 500ml bottles, then you'd input 500 here."></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field prefix="R" v-model="newData.pricePerItem" label="Price per Item" ></v-text-field>
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
              <v-btn color="blue darken-1" flat @click="$emit('productData', newData)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
</template>

<script>
// Besides input info, what other info does this component need?
// It doesn't need to know which product to create or update <-- let the parent take care of that.
// Maybe therefore it simply sends the input data to the parent who parses it for the correct gql mutation.

import vuetifyCloudinaryUpload from "vuetify-cloudinary-upload";
import srcForCloudinary from "@/helpers/srcForCloudinary.js";

export default {
  mounted() {
    // this.newData = this.product;
    // this.dialog = this.show;
  },
  props: {
    product: {
      type: Object,
      default() {
        return {
          name: "Gimme a name",
          description: "",
          measurementUnit: "Single Item, box or crate etc",
          unitsPerItem: 1,
          pricePerItem: 0.0,
          image: null
        };
      }
    },
    show: {
      default: false
    }
  },

  //   ["product", "show"],
  data() {
    return {
      //   dialog: this.show,
      newData: this.product,
      cloudinary: {
        name: "dylan-van-den-bosch",
        preset: "gi9lyrb6"
      },
      productImageId: null
    };
  },
  computed: {
    dialog: {
      get() {
        return this.show;
      },
      set(bool) {
        this.$emit("showForm", bool);
      }
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
</style>
