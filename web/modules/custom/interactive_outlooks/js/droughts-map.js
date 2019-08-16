/**
 * @file
 * Build the map(s)
 *
 */
(function (Drupal, $) {
  "use strict";

  // Drupal.behaviors.createDroughtMap = {
  // 	attach:function (context, settings) {
  //
  // 	  $('#drought-outlooks-map', context).once('drought-outlooks-map', function() {
  		  // Create the map
        var droughtsmap = L.map('droughts-map', {
          center: [38, -96],
          zoom: 4,
          minZoom: 4
        });

        // Add Esri World Topo base map via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(droughtsmap);

        // Get link to layer data
        const monthlyDrought = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_drought_outlk/MapServer/0/";
        const seasonalDrought = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_drought_outlk/MapServer/1/";
        //
        // We need to use the direct URL to the KML files
        //(instead of downloading them to a directory in our module) because they're automatically updated.
        //Using the direct URL produces errors on a development site, however, so we have to append it to a proxy URL
         const proxyurl = "https://cors-anywhere.herokuapp.com";

        //Add monhtly drought layer to map
        var monthlyDroughtLayer = L.esri.featureLayer({
         url: (proxyurl + "/" + monthlyDrought)
        }).addTo(droughtsmap);

        //Add seasonal drought layer to map
        var seasonalDroughtLayer = L.esri.featureLayer({
         url: (proxyurl + "/" + seasonalDrought)
        }).addTo(droughtsmap);
      
        //change the layers of the map to Monthly or Seasonal based on the dropdown list
        $('select[name=droughts-outlook-duration]').change(function() {
             alert("test");
        });


        //change the map to the correct area
        $('input[type=radio][name=droughts-map-view]').change(function() {
            if (this.value == 'conus') {
              droughtsmap.setView(new L.LatLng(38, -96), 4)
            }
            else if (this.value == 'alaska') {
              droughtsmap.setView(new L.LatLng(64.2,-149.4), 4)
            }
        });



        // Pull in WMS layers using leaflet.wms plugin {Does not work...yet}
        //var options = {'transparent': true};
        //var source = L.WMS.source("https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer", options);
        //source.addSubLayer('1');
        //source.addTo(temp_map);
  	//   }); // end .once
    //
  	// } // end attach
  // };

})(jQuery);
