<template>
    <div>
      <v-dialog v-model="dialog" persistent max-width="600px">
          <v-btn slot="activator" color="primary" dark>Add a Product</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">Add a Product</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
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
        <v-flex xs12 v-if="products" v-for="product in products" :key="product.name">
          {{ product.name }}
        </v-flex>

    </div>
</template>

<script>
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
</style>




