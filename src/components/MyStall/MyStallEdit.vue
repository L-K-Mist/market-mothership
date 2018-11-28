<template>
    <v-card>
        <v-card-title>
            <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
        <v-text-field
            label="Shop Name"
            hint="The name your shop is known as"
            v-model="stall.name"
        ></v-text-field>
        <p>
            We know you might be active at more than one flea market, but for now, we are only allowing one shop per person.
        </p>
        <p>
            Therefore, if {{$store.getters.currentMarket}} is not your "home base" flea market, please choose from below.
            If none of your markets are represented, please contact us!
        </p> 
        <v-select
            :items="markets"
            label="Select your main market"
            persistent-hint
            hint="You'll be able to add more markets later."
            v-model="mainMarket"
            @input="person.market = mainMarket"
        ></v-select>

        <v-textarea
            multi-line
            label="Description"
            hint="Your shop in general terms. Use lots of keywords, as this is what we scan in customer search queries."
            v-model="stall.description"
        ></v-textarea>               
        <v-btn color="accent" @click="gotStall">Continue</v-btn>
                </v-layout>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
    </v-card>  
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
