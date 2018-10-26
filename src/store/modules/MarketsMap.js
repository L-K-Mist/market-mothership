var gmapLinks = [
    "https: //www.google.co.za/maps/place/Flea+Market+-+South+Plaza+Market/@-29.8534589,30.8311078,11.25z/data=!4m8!1m2!2m1!1sflea+markets+south+africa!3m4!1s0x0:0x2446483095b22829!8m2!3d-29.8551235!4d31.0291672",
    "https: //www.google.co.za/maps/place/The+Stables+Lifestyle+Market/@-29.8534589,30.8311078,11.25z/data=!4m8!1m2!2m1!1sflea+markets+south+africa!3m4!1s0x0:0x8bf5133959dfc36b!8m2!3d-29.8203168!4d31.0298109",
    "https: //www.google.co.za/maps/place/Golden+Hours+Family+Market/@-29.8534589,30.8311078,11.25z/data=!4m8!1m2!2m1!1sflea+markets+south+africa!3m4!1s0x0:0xf161d06fc4c332b4!8m2!3d-29.7994642!4d31.0339308",
    "https: //www.google.co.za/maps/place/The+Dutch+Club+Fleamarket/@-29.8534589,30.8311078,11.25z/data=!4m8!1m2!2m1!1sflea+markets+south+africa!3m4!1s0x0:0x967f65a48fb2578d!8m2!3d-29.9227664!4d31.006422",
    "https: //www.google.co.za/maps/place/Victoria+Street+Market/@-29.8534589,30.8311078,11.25z/data=!4m8!1m2!2m1!1sflea+markets+south+africa!3m4!1s0x0:0x1358b517adb8f9f4!8m2!3d-29.8566867!4d31.0154772"
]


import scrapeGmapLink from '@/helpers/scrapeGmapLink.js'
import includes from 'lodash/includes';
import getW3W from '@/helpers/getW3W.js'





const state = {
    mapData: [],
    // showMap: false
}
const getters = {
    mapData(state) {
        return state.mapData
    },
    // showMap(state) {
    //     return state.showMap
    // },
};

const mutations = {

    mapData(state, payload) {
        var hasDuplicate = false
        state.mapData.forEach(element => {
            var duplicate = includes(element.market, payload.market)
            if (duplicate) {
                hasDuplicate = true
            }
        });
        if (hasDuplicate) {
            console.log('TCL: mapData -> hasDuplicate', hasDuplicate);

        } else {
            state.mapData.push(payload)
        }
        console.log('TCL: state.mapData', state.mapData);
    }
}

const actions = {

    async scrapeLink({
        commit
    }, payload) {

        var newFleaMarket = scrapeGmapLink(payload)

        var w3wTry = await getW3W(newFleaMarket.gps)
        console.log('TCL: w3wTry', w3wTry);
        newFleaMarket.w3wMapLink = w3wTry.w3wMapLink
        newFleaMarket.locWords = w3wTry.words
        console.log('TCL: newFleaMarket', newFleaMarket);
        commit('mapData', newFleaMarket)
    },
    // mapReportData({
    //     state,
    // }, payload) {

    //     //state.mapData = goodGPS
    //     state.showMap = true
    // }
};
export default {
    state,
    getters,
    mutations,
    actions
}