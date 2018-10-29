<template>
    <v-container fill-height align-content-center>
    <v-layout align-center justify-center="">
      <v-progress-circular color="indigo" indeterminate :size="200" :width="16"></v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "callback",
  mounted() {
    this.$auth.handleAuthentication().then(data => {
      this.$store.dispatch("personLoginData", data);
      this.$router.push({ name: "home" });
    });
  }
};
</script>