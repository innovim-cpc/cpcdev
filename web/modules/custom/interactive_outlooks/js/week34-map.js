/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
    "use strict";

          // Create the map
          const week34 = L.map('week34-map', {
            center: [38, -96],
            zoomSnap: 0.1,
            zoom: 3.9,
            minZoom: 3.9
          });
  
          // Add Esri World Topo base map via Esri Leaflet plugin
          L.esri.basemapLayer('Topographic').addTo(week34);
          

          $('#week34-map-header .title').text("U.S. Week 3 - 4 Outlooks");
          $('#week34-map-header .valid-dates').html("Valid: "  + "<br> Released: ");
          
       week34.invalidateSize();
  })(jQuery);