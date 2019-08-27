/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
  "use strict";

//  Drupal.behaviors.createHazardsMap = {
//  	attach:function (context, settings) {

//  	  $('#map-container', context).once('hazards-map', function() {
  		  // Set up map
        var hazardsmap = L.map('hazards-map', {
          center: [38, -96],
          zoom: 4,
          minZoom: 3.6
        });

        // Add Esri World Topo basemap via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(hazardsmap);

        // Get link to 8-14 day KML files found at https://www.cpc.ncep.noaa.gov/products/predictions/threats/threats.php
        const prcp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/prcp_D8_14.kml";
        const temp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/temp_D8_14.kml";
        const excessHeat814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/excess_heat_D8_14.kml";
        const wind814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/wind_D8_14.kml";
        const probPrcp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/prcp_prob_D8_14.kml";
        const probExcessHeat814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/excess_heat_prob_D8_14.kml";
        const probTemp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/temp_prob_D8_14.kml";
        const probWind814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/wind_prob_D8_14.kml";

        // We need to use the direct URL to the KML files (instead of downloading them to a directory in our module) because they're automatically updated. Using the direct URL produces errors on a development site, however, so we have to append it to a proxy URL
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        // Reference the layers based on the URL and proxy URL
        var prcp814kmlLayer = new L.KML(proxyurl + prcp814kml, {async: true});
        var temp814kmlLayer = new L.KML(proxyurl + temp814kml, {async: true});
        var excessHeat814kmlLayer = new L.KML(proxyurl + excessHeat814kml, {async: true});
        var wind814kmlLayer = new L.KML(proxyurl + wind814kml, {async: true});
        var probPrcp814kmlLayer = new L.KML(proxyurl + probPrcp814kml, {async: true});
        var probExcessHeat814kmlLayer = new L.KML(proxyurl + probExcessHeat814kml, {async: true});
        var probTemp814kmlLayer = new L.KML(proxyurl + probTemp814kml, {async: true});
        var probWind814kmlLayer = new L.KML(proxyurl + probWind814kml, {async: true});

        // Add the layers to the map
        hazardsmap.addLayer(prcp814kmlLayer);
        hazardsmap.addLayer(temp814kmlLayer);
        hazardsmap.addLayer(excessHeat814kmlLayer);
        hazardsmap.addLayer(wind814kmlLayer);
        hazardsmap.addLayer(probPrcp814kmlLayer);
        hazardsmap.addLayer(probExcessHeat814kmlLayer);
        hazardsmap.addLayer(probTemp814kmlLayer);
        hazardsmap.addLayer(probWind814kmlLayer);

        var validmonth = "";
        var releasemonth = "";

        $.ajax({
          type     : "GET",
          url      : proxyurl + temp814kml,
          dataType : "xml",
          success  : getValidDates,
          error    : function(){
            console.log("Could not retrieve XML file.");
          }
        });

        function getValidDates(xml) {
          const dateInfo = $(xml).find("name").first().text();
          console.log(dateInfo);
          const validDates = dateInfo.substring(dateInfo.indexOf("Valid"));
          console.log(validDates);
          $("#hazards-map-header .valid-dates").append(validDates).text();
        }

        // Checkbox functionality
        $("input[id=precip-hazards-814]").on('change', function() {
          if(this.checked) {
            hazardsmap.addLayer(prcp814kmlLayer)
          } else {
            hazardsmap.removeLayer(prcp814kmlLayer)
          }
        });

        $("input[id=precip-probabilistic-814]").on('change', function() {
          if(this.checked) {
            hazardsmap.addLayer(probPrcp814kmlLayer)
          } else {
            hazardsmap.removeLayer(probPrcp814kmlLayer)
          }
        });

        $("input[id=temp-hazards-814]").on('change', function() {
          if(this.checked) {
            hazardsmap.addLayer(temp814kmlLayer)
            hazardsmap.addLayer(excessHeat814kmlLayer)
          } else {
            hazardsmap.removeLayer(temp814kmlLayer)
            hazardsmap.removeLayer(excessHeat814kmlLayer)
          }
        });

        $("input[id=temp-probabilistic-814]").on('change', function() {
          if(this.checked) {
            hazardsmap.addLayer(probTemp814kmlLayer)
            hazardsmap.addLayer(probExcessHeat814kmlLayer)
          } else {
            hazardsmap.removeLayer(probTemp814kmlLayer)
            hazardsmap.removeLayer(probExcessHeat814kmlLayer)
          }
        });

        $("input[id=wind-hazards-814]").on('change', function() {
          if(this.checked) {
            hazardsmap.addLayer(wind814kmlLayer)
          } else {
            hazardsmap.removeLayer(wind814kmlLayer)
          }
        });

        $("input[id=wind-probabilistic-814]").on('change', function() {
          if(this.checked) {
            hazardsmap.addLayer(probWind814kmlLayer)
          } else {
            hazardsmap.removeLayer(probWind814kmlLayer)
          }
        });

        //change the map to the correct area
        $('input[type=radio][name=hazards-map-view]').change(function() {
          if (this.value == 'conus') {
            hazardsmap.setView(new L.LatLng(38, -96), 4)
          }
          else if (this.value == 'alaska') {
            hazardsmap.setView(new L.LatLng(64.2,-149.4), 4)
          }
        });

})(jQuery);
