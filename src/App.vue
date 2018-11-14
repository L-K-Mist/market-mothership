<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="my-stall">
          <v-list-tile-action>
            <v-icon>fa-shopping-basket</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Shop</v-list-tile-title>
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

        <v-list-tile @click="testFunc">
          <v-list-tile-action>
            <v-icon>fa-sign-out</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dylan's Function Testing Button</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar scroll-off-screen :scroll-threshold="50" color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>The Market-Mother-Ship</v-toolbar-title>
      <v-spacer></v-spacer>
                            <v-avatar @click="gotoMyStall" v-if="isLoggedIn && person.image" :style="avatarStyle" class=" elevation-6 "
                            :size="avatarSize"
                            color="grey lighten-4"
                            >
                                <img  :src="person.image"/>
                               
                            </v-avatar>
      <v-icon medium hint="logout" @click="logoff">fa-sign-out</v-icon>
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view/>
      </v-slide-y-transition>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018</span>
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
    drawer: null,
    avatarStyle: {
      position: "absolute",
      top: "40px",
      right: "40px",
      cursor: "pointer"
    },
    avatarSize: "12vw"
  }),
  computed: {
    isLoggedIn() {
      return localStorage.isLoggedIn;
    },
    person() {
      return this.$store.getters.person;
    },
    breakpoint() {
      return this.$vuetify.breakpoint.name;
      //connect and use
      // switch (this.$vuetify.breakpoint.name) {
      //   case "xs":
      //     // console.log('TCL: -------------------------');
      //     // console.log('TCL: popupWidth -> xs');
      //     // console.log('TCL: -------------------------');
      //     return 250;
      //   case "sm":
      //     return 400;
      //   case "md":
      //     return 400;
      //   case "lg":
      //     return 600;
      //   case "xl":
      //     return 800;
      // }
    }
  },
  watch: {
    breakpoint(newVal) {
      console.log("​breakpoint -> newVal", newVal);
    }
  },
  methods: {
    gotoMyStall() {
      this.$router.push("/my-stall");
    },
    logoff() {
      this.$auth.logout();
    },
    testFunc() {
      this.$store.dispatch("fetchMe");
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
  top: 20px;
  right: 40px;
  cursor: pointer;
}
</style>

