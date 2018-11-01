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
      this.$auth.authorizeUser();
      this.$router.push({ name: "home" });
    });
  }
};
</script>

TODO Validate the Claims using Token audience and issuer
Once the application verifies the token's signature, the next step is to validate the standard claims of the token's payload. The following validations need to be made:

Token expiration: The current date/time must be before the expiration date/time listed in the exp claim (which is a Unix timestamp).

Token issuer: The iss claim denotes the issuer of the JWT. The value must match the URL of your Auth0 tenant. For JWTs issued by Auth0, iss holds your Auth0 domain with a https:// prefix and a / suffix: https://YOUR_AUTH0_DOMAIN/.

Token audience: The aud claim identifies the recipients that the JWT is intended for. The value must match the Client ID of your Auth0 Application.