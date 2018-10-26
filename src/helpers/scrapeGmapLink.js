function scrapeGmapLink(string) {
    var split = string.split('/')
    var roughPlace = split[5]
    var place = roughPlace.replace(/\+/g, " ");
    // console.log('TCL: splitLink -> place', place);

    // console.log('TCL: splitLink -> split', split);
    var ballPark = split[split.length - 1]
    // console.log('TCL: splitLink -> ballPark', ballPark);
    var closer = ballPark.split('!3d')
    var stillCloser = closer[closer.length - 1]
    var closerStill = stillCloser.split('!4d')
    var lat = closerStill[0]
    var lng = closerStill[1]
    return {
        market: place,
        lat,
        lng
    }
}

export default scrapeGmapLink