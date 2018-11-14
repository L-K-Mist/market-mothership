import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Callback from "@/views/Callback.vue"
import MyStall from "@/views/MyStall.vue"




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
  const isLoggedIn = router.app.$auth.isAuthenticated()
  localStorage.isLoggedIn = isLoggedIn
  console.log("​isLoggedIn", localStorage.isLoggedIn)

  if (to.name == 'callback') { // check if "to"-route is "callback" and allow access
    next()
  } else if (to.matched.some(record => record.meta.requiresAuth)) { // if this route requires auth
    if (isLoggedIn) { // if authenticated allow access
      router.app.$auth.authorizeUser()
      next()
    } else { // trigger auth0 login
      console.log("router is requiring login")
      router.app.$auth.login()
    }
  } else {
    next(); // ... otherwise, we allow the user to continue as intended.
  }
})

export default router