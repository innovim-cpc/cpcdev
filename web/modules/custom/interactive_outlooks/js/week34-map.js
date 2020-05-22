/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
    "use strict";

          // Create the map
          const week34map = L.map('week34-map', {
            center: [38, -96],
            zoomSnap: 0.1,
            zoom: 3.9,
            minZoom: 3.9
          });

          // Add Esri World Topo basemap via Esri Leaflet plugin
          L.esri.basemapLayer('Topographic').addTo(week34map);


          $('#week34-map-header .title').text("U.S. Week 3 - 4 Outlooks");
          $('#week34-map-header .valid-dates').html("Valid: "  + "<br> Released: ");

       week34map.invalidateSize();
  })(jQuery);
