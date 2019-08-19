/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
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
  
        // create monhtly drought layer
        var monthlyDroughtLayer = new L.esri.featureLayer({
          url: monthlyDrought
        });
        
        //create seasonal drought layer
        var seasonalDroughtLayer = new L.esri.featureLayer({
         url: seasonalDrought
        });
        
        //Add layer to map
        monthlyDroughtLayer.addTo(droughtmap);
        
        var validmonth = "August 2019";
        var releasemonth = "July 31, 2019";
        var seasonalstartdate = "August 15";
        var seasonalenddate = "November, 30, 2019";
        var releaseseasonal = "August 15";
        
        //default the page to show the monthly dates
        $('#valid-dates').text("Valid for " + validmonth + "  Released " + releasemonth);

        //change the layers of the map to Monthly or Seasonal based on the dropdown list
        $('input[name=drought-map-duration]').on('change', function() {
             if (this.value == 'monthly') {
               seasonalDroughtLayer.removeFrom(droughtmap);
               monthlyDroughtLayer.addTo(droughtmap); 
               $('#title').text("U.S. Monthly Drought Outlook");
               $('#valid-dates').text("Valid for " + validmonth + "  Released " + releasemonth);
             }
             else if (this.value == 'seasonal') {
               monthlyDroughtLayer.removeFrom(droughtmap);
               seasonalDroughtLayer.addTo(droughtmap);
               $('#title').text("U.S. Seasonal Drought Outlook");
               $('#valid-dates').text("Valid for " + seasonalstartdate + " - " + seasonalenddate + "  Released " + releaseseasonal);
             }               
        });


        //change the map to the correct area
        $('input[type=radio][name=drought-map-view]').on('change',function() {
            if (this.value == 'conus') {
              droughtmap.setView(new L.LatLng(38, -96), 4)
            }
            else if (this.value == 'alaska') {
              droughtmap.setView(new L.LatLng(64.2,-149.4), 4)
            }
        });

})(jQuery);
