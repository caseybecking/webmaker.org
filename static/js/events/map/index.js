require.config({
    paths: {
        'oms':              '/ext/js/oms',
        'infobubble':       '/ext/js/infobubble',
        'google':           'map/google',
        'markerclusterer':  'map/markerclusterer',
    }
});
define(['jquery', 'google', 'map/map_maker', 'map/forms'],
function ($, google, MapMaker, EventForms) {

    var defaultZoom = 13;
    var mapCenter = new google.maps.LatLng(37.774546, -122.433523);
    var mapOptions = {
        zoom: defaultZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: mapCenter,

        panControl: false,
        rotateControl: false,
        scaleControl: false,
        streetViewControl: true,
        overviewMapControl: false,

        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            mapTypeIds: [ 'webmaker_style',
                google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE,
                google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN ]
        },

        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE
        }
    };
    var mcOptions = {
        gridSize: 20,
        maxZoom: 15,    // Don't cluster after this zoom level
                        // Clicking on a cluster goes to zoom 16,
                        //  we don't want clusters at this level.
        imagePath: "/img/map/c",
        imageSizes: [43, 43, 43, 43, 43]
    };

    var mapMaker = new MapMaker($('#map-canvas')[0], mapOptions, mcOptions);
    mapMaker.setupInfoWindow();
    mapMaker.updateLocation() ;

    EventForms(mapMaker);

    return mapMaker;
});