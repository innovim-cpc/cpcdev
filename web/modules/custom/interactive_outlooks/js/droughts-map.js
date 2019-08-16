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
        
        // Get link to 8-14 day KML files found at https://www.cpc.ncep.noaa.gov/products/predictions/threats/threats.php
        const monthlyDrought = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/prcp_D8_14.kml";
        const seasonalDrought = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/prcp_prob_D8_14.kml";
        
        // We need to use the direct URL to the KML files (instead of downloading them to a directory in our module) because they're automatically updated. Using the direct URL produces errors on a development site, however, so we have to append it to a proxy URL
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        
        // Create the layers based on the URL and proxy URL
        var monthlyDroughtLayer = new L.KML(proxyurl + monthlyDrought, {async: true});
        var seasonalDroughtLayer = new L.KML(proxyurl + seasonalDrought, {async: true});
        
        // Add the layers to the map
        droughtsmap.addLayer(monthlyDroughtLayer);
        droughtsmap.addLayer(seasonalDroughtLayer);
      
        $("input[id=droughts-outlook-duration]").on('change', function() {        
             var selectVal = $(this).val();
             alert(selectVal);
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
