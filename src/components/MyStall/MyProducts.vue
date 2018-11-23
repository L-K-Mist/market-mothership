<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn slot="activator" color="primary" dark>Add a Product</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Add a Product</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field label="Product Name" hint="What are you selling?" required></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Description" hint="Be brief and sell benefits over features."></v-text-field>
                </v-flex>

                <v-flex xs12 md6>
                  <v-autocomplete
                    :items="['Kilograms', 'Grams', 'Liters', 'Milliliters', 'Dozen', 'Single Item, box or crate etc', 'Not Applicable']"
                    label="Unit of Measure"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Units per Item" hint="eg. If you were selling 500ml bottles, then you'd input 500 here."></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  })
};
</script>



