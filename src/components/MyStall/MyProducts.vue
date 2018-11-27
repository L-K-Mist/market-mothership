<template>
    <div>
      <v-btn color="primary" @click="dialog = true" dark>Add a Product</v-btn>
        <product-form  :show="dialog" @showForm="showForm" @productData="saveProduct"></product-form>
        <!-- Product Display -->
        <products-list :editMode="true" :products="products">
          <p slot="cloudinary-edit-instruction">If you want to keep your existing picture don't click "Product Image"</p>
        </products-list>
          
    </div>
</template>

<script>
// https://res.cloudinary.com/dylan-van-den-bosch/image/upload/v1543224787/w_auto,h_240,c_fill,g_auto,q_auto,f_auto/Baymax-Action-Figures-Colorful-Light-Cute-Table-Bedroom-Decoration-Amazing-Children-Kids-Girls-Gift.jpg_640x640_ohtj8c.webp
// https://res.cloudinary.com/dylan-van-den-bosch/image/upload/w_auto,h_240,c_fill,g_auto,q_auto,f_auto/cf5agtsap6cun2mvped6

import ProductsList from "@/components/MultiPurpose/ProductsList";
import ProductForm from "@/components/MultiPurpose/ProductForm";

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

    product: {}
  }),
  computed: {
    products() {
      return this.$store.getters.stallProducts;
    }
  },
  methods: {
    saveProduct(productData) {
      this.$store.dispatch("createProduct", {
        stallId: this.stallId,
        ...productData
      });
      this.dialog = false;
    },
    showForm(bool) {
      this.dialog = bool;
    }
  },
  components: {
    ProductsList,
    ProductForm
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
.product-name {
  color: white;
  text-transform: capitalize;
  font-variant: small-caps;
}
/* >>> .v-expansion-panel__header {
  padding: 0% !important;
} */
</style>




