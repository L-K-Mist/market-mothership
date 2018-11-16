import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import Callback from "@/views/Callback.vue"
import MyStall from "@/views/MyStall.vue"
import Login from "@/views/Login.vue"





Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/my-stall',
      name: 'my-stall',
      component: MyStall,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// // Recall from our server implementation, only an authenticated user can create a new meetup. So we need a way to implement this on the frontend. 
// router.beforeEach((to, from, next) => {
//   // if any routes have a meta object with requiresAuth set to true ...
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     localStorage.getItem('USER_TOKEN') ? next() : next('/login') // ...check if there is a USER_TOKEN in localstorage, if not found, redirect user to the login page.
//   } else {
//     next() // ... otherwise, we allow the user to continue as intended.
//   }
// })

// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {

  var isLoggedIn = store.getters.isLoggedIn
  console.log("​isLoggedIn top of router beforeEach", isLoggedIn)

  const routerToName = to.name

  // alert('about to enter router if statements')
  if (to.name == 'callback' || to.name == 'login') { // check if "to"-route is "callback" and allow access

    console.log("Router went straight to next")
    // alert('next?')
    next()
  } else if (to.matched.some(record => record.meta.requiresAuth)) { // if this route requires auth
    store.commit('newRoute', routerToName)
    if (isLoggedIn) { // if authenticated allow access
      // router.app.$auth.authorizeUser()
      console.log('routerTriggered as if logged in')
      // if (!store.getters.isPrismaAuth) {
      //   store.dispatch("prismaAuth")
      // }
      // alert('next?')
      next()
    } else { // trigger auth0 login
      console.log("router is requiring login")
      router.push("/login")
    }
  } else {
    next(); // ... otherwise, we allow the user to continue as intended.
  }
})

export default router