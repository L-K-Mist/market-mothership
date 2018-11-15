import store from './store'
import router from './router'
import isAfter from "date-fns/is_after";
import subtractMinutes from "date-fns/sub_minutes";
import addSeconds from "date-fns/add_seconds";
import differenceInMinutes from "date-fns/difference_in_minutes";
import differenceInMilliSeconds from "date-fns/difference_in_milliseconds";
import {
    WebAuth
} from "auth0-js";

// Get the route that user was on when login kicked in and save that to this state
// Then when the login is done have Callback.vue push to where the user was headed.

let refreshTimeout = null;
const auth0 = new WebAuth({
    domain: "welink.au.auth0.com",
    clientID: "0SIaIds4btTC6nLkYiOFkj5nJUg4GhJx",
    // make sure this line contains the port: 8080
    redirectUri: process.env.VUE_APP_ENV_CALLBACK,
    // we will use the api/v2/ to access the user information as payload
    audience: "https://" + "welink.au.auth0.com" + "/api/v2/",
    responseType: "token id_token",
    scope: "openid email profile" // define the scopes you want to use
});

export {
    auth0
};
export {
    initSession
};
export {
    refreshTokens
};
export {
    logout
};
export default {
    initSession,
    refreshTokens,
    auth0,
};

function logout() {
    auth0.logout({
        returnTo: "https://market-mothership.firebaseapp.com" || "http://localhost:8080"
    });
    store.commit("update_auth_tokens", {}); //clear our tokens
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
}


function initSession() {
    return new Promise((resolve) => {
        let tokenExpiryDate = store.getters["tokensExpiry"];
        if (!tokenExpiryDate) {
            console.log("No token expiry date. user probably never logged in");
            // return router.push("/login");
            return store.commit("isLoggedIn", false)
        }

        let tenMinutesBeforeExpiry = subtractMinutes(tokenExpiryDate, 10); //If the token has expired or will expire in the next 30 minutes
        const now = new Date();

        if (isAfter(now, tenMinutesBeforeExpiry)) { //If the token has expired or will expire in the next 10 minutes
            console.log("Token expired/will expire in the next 1 minutes");
            // return router.push("/login");
            return store.commit("isLoggedIn", false)
        }

        console.log("Token Ok. Expiring at " + tokenExpiryDate);
        refreshTimeout = setTimeout(refreshTokens, differenceInMilliSeconds(tenMinutesBeforeExpiry, now));
    });
}

function refreshTokens() {
    return new Promise((resolve) => {
        auth0.checkSession({}, function (err, authResult) {
            if (err) {
                store.commit("isLoggedIn", false)
                // router.push("/login");
            }
            store.commit("update_auth_tokens", authResult);
            const tokenExpiryDate = addSeconds(new Date(), authResult.expiresIn);
            const tenMinutesBeforeExpiry = subtractMinutes(tokenExpiryDate, 10);
            const now = new Date();
            refreshTimeout = setTimeout(refreshTokens, differenceInMilliSeconds(tenMinutesBeforeExpiry, now));
            resolve();
        });
    });
}