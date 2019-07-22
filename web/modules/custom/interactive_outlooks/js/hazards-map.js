/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
  "use strict";

  // Hide the loader initially
  $('.loader').hide();
  $('#temp-seasonal-options').hide();

//  Drupal.behaviors.createHazardsMap = {
//  	attach:function (context, settings) {

//  	  $('#map-container', context).once('hazards-map', function() {
  		  // Set up map
        var hazardsmap = L.map('hazards-map', {
          center: [39, -96],
          zoom: 4,
          minZoom: 4
        });

        // Add Esri World Topo basemap via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(hazardsmap);

        // Get link to 8-14 day KML files found at https://www.cpc.ncep.noaa.gov/products/predictions/threats/threats.php
        const prcp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/prcp_D8_14.kml";
        const temp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/temp_D8_14.kml";
        const wind814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/wind_D8_14.kml";
        const probPrcp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/prcp_prob_D8_14.kml";
        const probTemp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/temp_prob_D8_14.kml";
        const probWind814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/wind_prob_D8_14.kml";

        // We need to use the direct URL to the KML files (instead of downloading them to a directory in our module) because they're automatically updated. Using the direct URL produces errors on a development site, however, so we have to append it to a proxy URL
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        // Create the layers based on the URL and proxy URL
        var prcp814kmlLayer = new L.KML(proxyurl + prcp814kml, {async: true});
        var temp814kmlLayer = new L.KML(proxyurl + temp814kml, {async: true});
        var wind814kmlLayer = new L.KML(proxyurl + wind814kml, {async: true});
        var probPrcp814kmlLayer = new L.KML(proxyurl + probPrcp814kml, {async: true});
        var probTemp814kmlLayer = new L.KML(proxyurl + probTemp814kml, {async: true});
        var probWind814kmlLayer = new L.KML(proxyurl + probWind814kml, {async: true});

        // Add the layers to the map
        hazardsmap.addLayer(prcp814kmlLayer);
        hazardsmap.addLayer(temp814kmlLayer);
        hazardsmap.addLayer(wind814kmlLayer);
        hazardsmap.addLayer(probPrcp814kmlLayer);
        hazardsmap.addLayer(probTemp814kmlLayer);
        hazardsmap.addLayer(probWind814kmlLayer);

        var currentLayer;

        // Set and add initial WMS layer to map
        currentLayer = temp610Layer;
        $('#temp-outlook h2 span').html('6 to 10 Day');
        // Hard coding date range for now; will set up auto functions later
        $('.outlook-date').html('Monday October 16 &ndash; Friday October 20');
        // Show loader since layers are sometimes slow to load
        currentLayer.on('loading', function (event) {
          $('.loader').fadeIn("fast");
        });
        //currentLayer.addTo(hazardsmap);
        currentLayer.on('load', function (event) {
          $('.loader').fadeOut("fast");
        });
        $('.myCheckbox').prop('checked', true);
        $('.myCheckbox').prop('checked', false);

        var allLayers = { '.precip-hazards-814': 'prcp814kmlLayer',
                          '.temp-hazards-814': 'temp814kmlLayer',
                          '.wind-hazards-814': 'wind814kmlLayer'
                        };
        $.each(allLayers, function(outlook, layer) {
          if ($(outlook).is(':checked')) {
            console.log(outlook, layer);
            hazardsmap.addLayer(layer);
          } else if ($(outlook).not(':checked')) {
            hazardsmap.removeLayer(layer);
          }
        });



        // Function to remove any existing layers
        function removePrevLayer() {
          if (map.hasLayer(currentLayer)) {
            map.removeLayer(currentLayer);
          }
        };

        // Function to swap layers based on duration select list option
        function addNewLayer() {
          var opacityVal = $('.opacity-slider__range').val();
          currentLayer.on('loading', function (event) {
            console.log('start loading tiles');
            $('.loader').fadeIn("fast");
          });
          currentLayer.addTo(map);
          currentLayer.setOpacity(opacityVal);
          console.log(opacityVal);
          currentLayer.on('load', function (event) {
            //console.log('all tiles loaded');
            $('.loader').fadeOut("fast");
          });
        };

        // Switch between CONUS view and Alaska view
        // based on radio button selection
        $(".hazards-map-view", context).once('change-view', function() {
          $(this).on('click', function() {
            var viewSelect = $('input[name=hazards-map-view]:checked').val();

            switch (viewSelect) {
              case 'conus':
                hazardsmap.setView([39, -96]);
                break;
              case 'alaska':
                hazardsmap.setView([64, -153]);
                break;
              default:
                hazardsmap.setView([39, -96]);
            }
          });
        });

        // Get current opacity level from current value of range slider input
        var opacityVal = $('.opacity-slider__range').val();

        // Convert opacity decimal value to percent
        var percent = Math.round(opacityVal * 100);

        // Write percent value in html label area
        $('.opacity-slider__value').html(percent);

        // Function to change layer opacity based on range slider input
        $('.opacity-slider__range').on('input', function() {
          var opacityVal = $(this).val();
          //console.log(opacityVal);
          //temp610Layer.setOpacity(opacityVal);
          currentLayer.setOpacity(opacityVal);
          var percent = Math.round(opacityVal * 100);
          $('.opacity-slider__value').html(percent);
        });

        // Create marker at specific location
        var marker = L.marker([38.98970,-76.93776]).addTo(map);

        // map.on('click', addMarker);

        function addMarker(e){
          // Add marker to map at click location
          var newMarker = new L.marker(e.latlng).addTo(map);
        }

        // Pull in WMS layers using leaflet.wms plugin {Does not work...yet}
        //var options = {'transparent': true};
        //var source = L.WMS.source("https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer", options);
        //source.addSubLayer('1');
        //source.addTo(map);

})(jQuery);
