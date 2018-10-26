var gmapLinks = [
    "https: //www.google.co.za/maps/place/Flea+Market+-+South+Plaza+Market/@-29.8534589,30.8311078,11.25z/data=!4m8!1m2!2m1!1sflea+markets+south+africa!3m4!1s0x0:0x2446483095b22829!8m2!3d-29.8551235!4d31.0291672",
    "https: //www.google.co.za/maps/place/The+Stables+Lifestyle+Market/@-29.8534589,30.8311078,11.25z/data=!4m8!1m2!2m1!1sflea+markets+south+africa!3m4!1s0x0:0x8bf5133959dfc36b!8m2!3d-29.8203168!4d31.0298109",
    "https: //www.google.co.za/maps/place/Golden+Hours+Family+Market/@-29.8534589,30.8311078,11.25z/data=!4m8!1m2!2m1!1sflea+markets+south+africa!3m4!1s0x0:0xf161d06fc4c332b4!8m2!3d-29.7994642!4d31.0339308",
    "https: //www.google.co.za/maps/place/The+Dutch+Club+Fleamarket/@-29.8534589,30.8311078,11.25z/data=!4m8!1m2!2m1!1sflea+markets+south+africa!3m4!1s0x0:0x967f65a48fb2578d!8m2!3d-29.9227664!4d31.006422",
    "https: //www.google.co.za/maps/place/Victoria+Street+Market/@-29.8534589,30.8311078,11.25z/data=!4m8!1m2!2m1!1sflea+markets+south+africa!3m4!1s0x0:0x1358b517adb8f9f4!8m2!3d-29.8566867!4d31.0154772"
]

import scrapeGmapLink from '@/helpers/scrapeGmapLink.js'
// import {
//     store
// } from '../index.js'

// function seed() {
//     var dirtyArray = gmapLinks.map(function (link) {
//         var target = scrapeGmapLink(link)
//         // console.log('TCL: target', target);
//         return target
//     })
//     console.log('TCL: dirtyArray', dirtyArray);
//     state.mapData = dirtyArray
//     // store.dispatch('initMapData', dirtyArray)
// }

// seed()

// console.log('TCL: gmapLinks', gmapLinks);

const state = {
    mapData: [],
    showMap: false
}
const getters = {
    mapData(state) {
        return state.mapData
    },
    showMap(state) {
        return state.showMap
    },
};
const actions = {
    initMapData({
        state
    }, payload) {
        state.mapData = payload
    },
    scrapeLink({
        state
    }, payload) {
        var newFleaMarket = scrapeGmapLink(payload)
        state.mapData.push(newFleaMarket)
        console.log('TCL: state.mapData', state.mapData);

    },
    mapReportData({
        state,
    }, payload) {

        //state.mapData = goodGPS
        state.showMap = true
    }
};
export default {
    state,
    getters,
    actions
}