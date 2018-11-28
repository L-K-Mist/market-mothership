<template>
  <v-app id="inspire">
    <v-navigation-drawer
    style="z-index: 15"
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

        <v-list-tile to="/my-stall">
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

        <v-list-tile @click="testFunc()">
          <v-list-tile-action>
            <v-icon>fa-sign-out</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dylan's Function Testing Button</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar scroll-off-screen :scroll-threshold="50" color="indigo" dark fixed app style="z-index: 14">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="ml-1">Market-Mother-Ship <img class="ufo ml-2" src="/img/icons/ufo.svg"/> </v-toolbar-title>
      <v-spacer></v-spacer>
                            <v-avatar @click="gotoMyStall" v-if="person.image" :style="avatarStyle" class=" elevation-6 "
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
    <v-footer color="indigo" absolute app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
// TODO NEXT total revamp of login and prisma auth   to fix registration.   Maybe move update_auth_tokens to an action so that it can logically trigger prismaAuth
//TODO: Allow user to edit already created products
//Find out what's going on with sending measurement units to DB
// Stalls on front-page needs a heading
// In MyStall adding a product should optimistically push the product to products
// Improve the way measurement units display eg if kilograms is 1 then it should show 1 kilogram <-- gonna be a fun exercise.
// Hmmm... something like if units per item is 1 then splice the S of the measurements.

// Change pointer on Stall Image in MyStall

import { logout, initSession } from "@/session";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, locationError);
  } else {
    console.log("Geo Location not supported by browser");
  }
}

function locationError(error) {
  console.log("​locationError -> error", error);

  // switch (error.code) {
  //   case error.PERMISSION_DENIED:
  //     return "User denied the request for Geolocation.";
  //     break;
  //   case error.POSITION_UNAVAILABLE:
  //     return "Location information is unavailable.";
  //     break;
  //   case error.TIMEOUT:
  //     return "The request to get user location timed out.";
  //     break;
  //   case error.UNKNOWN_ERROR:
  //     return "An unknown error occurred.";
  //     break;
  // }
}
//function that retrieves the position
function showPosition(position) {
  var location = {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude
  };
  console.log(location);
}
export default {
  created() {
    // this.authorize();
  },
  mounted() {
    initSession().then(() => {
      if (this.isLoggedIn) {
        console.log("I was called in app.vue after initSession resolved");
      }
    }); //Initialize our session
    this.$store.dispatch("prismaAuth");
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
    person() {
      return this.$store.getters.person;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
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
    isLoggedIn(newVal) {
      if (newVal) {
        this.$nextTick(async () => {
          await this.$store.dispatch("prismaAuth");
        });
      }
    },
    breakpoint(newVal) {
      // this.$store.dispatch("viewPort", newVal);
      console.log("​breakpoint -> newVal", newVal);
    }
  },
  methods: {
    gotoMyStall() {
      this.$router.push("/my-stall");
    },
    logoff() {
      logout();
    },
    testFunc() {
      console.log("​testFunc -> testFunc");
      //function that gets the location and returns it

      //request for location
      getLocation();
    },
    rearrangeMapDataForPrisma() {
      // this function is not used. TODO remove
      this.$store.dispatch("fetchMyStall");
    }
    // async authorize() {
    //   if (this.$auth.isAuthenticated()) {
    //     const status = await this.$auth.authorizeUser();
    //     this.$store.dispatch("activeUser", status.data.authorize);
    //   } else {
    //     console.log("user not logged in");
    //   }
    // }
  }
};
</script>
<style>
#avatar {
  position: absolute;
  top: 20px;
  right: 40px;
  cursor: pointer;
}
.ufo {
  width: 30px;
  position: relative;
  top: 5px;
}
.text-shadow {
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
}
</style>

