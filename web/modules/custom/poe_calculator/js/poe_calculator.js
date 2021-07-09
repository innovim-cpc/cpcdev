/**
 * @file
 * Build the map(s)
 *
 */
 (function ($) {
    "use strict";

  
    // Create the map
    const poemap = L.map('poe-map', {
        center: [38, -96],
        zoomSnap: 0.1,
        zoom: 3.9,
        minZoom: 3.6,
        attributionControl: false
    });

        // Add Esri Gray base map via Esri Leaflet plugin
    L.esri.basemapLayer('Gray').addTo(poemap);

  
    poemap.invalidateSize();
       
  
  })(jQuery);
  