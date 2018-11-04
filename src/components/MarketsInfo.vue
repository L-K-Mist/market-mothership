<template>
    <v-container wrap grid-list-xs>
        <v-layout row wrap>
        <v-checkbox v-for="market in markets" :key="market.name"
        :label="market.name" v-model="market.show" :value="market.show"></v-checkbox>
        </v-layout>
    </v-container>
</template>
