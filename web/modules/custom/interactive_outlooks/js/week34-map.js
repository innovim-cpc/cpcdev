/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
    "use strict";

          // Create the map
      //     const week34map = L.map('week34-map', {
      //       center: [38, -96],
      //       zoomSnap: 0.1,
      //       zoom: 3.9,
      //       minZoom: 3.9
      //     });

      //     // Add Esri World Topo basemap via Esri Leaflet plugin
      //     L.esri.basemapLayer('Topographic').addTo(week34map);


           $('#week34-map-header .title').text("U.S. Week 3 - 4 Outlooks");
           $('#week34-map-header .valid-dates').html("<br><br>  ");
           

           $('input[type=radio][name=week34-probability]').on('change',function() {
            if (this.value == 'temp-probability') {
              //show temperature probability
              $('#week34image').attr('src','https://www.cpc.ncep.noaa.gov/products/predictions/WK34/gifs/WK34temp.gif')
              
            }
            else if (this.value == 'precip-probability') {
               //show precipitation probability
               $('#week34image').attr('src','https://www.cpc.ncep.noaa.gov/products/predictions/WK34/gifs/WK34prcp.gif')
            }
          });

      //  week34map.invalidateSize();
  })(jQuery);
