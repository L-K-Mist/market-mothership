<template>
    <div>
    </div>
</template>

<script>
import { auth0 } from "@/session.js";
export default {
  name: "Login",
  mounted() {
    auth0.authorize();
  }
};
</script>

<style scoped>
</style>