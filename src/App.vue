<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
                <v-list-tile to="my-stall">
          <v-list-tile-action>
            <v-icon>fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sort Maps</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logoff">
          <v-list-tile-action>
            <v-icon>fa-sign-out</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Off</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar scroll-off-screen :scroll-threshold="50" color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>The Market-Mother-Ship</v-toolbar-title>
      <v-spacer></v-spacer>
                            <v-avatar class="avatar elevation-12 "
                            size="8vw"
                            color="grey lighten-4"
                            >
                                <img v-if="person.image" :src="person.image"/>
                                <v-icon v-else size="150">fa-user</v-icon>
                            </v-avatar>
      <v-icon  hint="logout" @click="logoff">fa-sign-out</v-icon>
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view/>
      </v-slide-y-transition>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  created() {
    this.authorize();
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  computed: {
    person() {
      return this.$store.getters.person;
    }
  },
  methods: {
    logoff() {
      this.$auth.logout();
    },
    rearrangeMapDataForPrisma() {
      this.$store.dispatch("fetchMyStall");
    },
    async authorize() {
      if (this.$auth.isAuthenticated()) {
        const status = await this.$auth.authorizeUser();
        this.$store.dispatch("activeUser", status.data.authorize);
      } else {
        console.log("user not logged in");
      }
    }
  }
};
</script>
<style scoped>
.avatar {
  position: absolute;
  top: 30px;
  left: 30px;
}
</style>

