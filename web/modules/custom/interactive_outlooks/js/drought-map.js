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
        var droughtmap = L.map('drought-map', {
          center: [38, -96],
          zoom: 4,
          minZoom: 4
        });

        // Add Esri World Topo base map via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(droughtmap);
        
        

        // Get link to layer data
        const monthlyDrought = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_drought_outlk/MapServer/0/";
        const seasonalDrought = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_drought_outlk/MapServer/1/";
        //
        // We need to use the direct URL to the KML files
        //(instead of downloading them to a directory in our module) because they're automatically updated.
        //Using the direct URL produces errors on a development site, however, so we have to append it to a proxy URL
        const proxyurl = "https://cors-anywhere.herokuapp.com";

        // create monhtly drought layer
        var monthlyDroughtLayer = new L.esri.featureLayer({
          url: (proxyurl + "/" + monthlyDrought)
        });
        
        //create seasonal drought layer
        var seasonalDroughtLayer = new L.esri.featureLayer({
         url: (proxyurl + "/" + seasonalDrought)
        });
        
        //Add layer to map
        monthlyDroughtLayer.addTo(droughtmap);
        seasonalDroughtLayer.addTo(droughtmap);
        
        monthlyDroughtLayer.removeFrom(droughtmap);
        

        // //change the layers of the map to Monthly or Seasonal based on the dropdown list
        // $('select[name=drought-outlook-duration]').change(function() {
        //      alert("test");
        // });


        //change the map to the correct area
        $('input[type=radio][name=drought-map-view]').on('change',function() {
            if (this.value == 'droughtconus') {
              droughtmap.setView(new L.LatLng(38, -96), 4)
            }
            else if (this.value == 'droughtalaska') {
              droughtmap.setView(new L.LatLng(64.2,-149.4), 4)
            }
        });

})(jQuery);
