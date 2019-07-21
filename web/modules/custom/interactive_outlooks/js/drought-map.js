/**
 * @file
 * Build the map(s)
 *
 */
(function (Drupal, $) {
  "use strict";

  var drought_map;

  Drupal.behaviors.createDroughtMap = {
  	attach:function (context, settings) {

  	  $('#drought-outlooks-map', context).once('drought-outlooks-map', function() {
  		  // Create the map
        var drought_map = L.map('drought-outlooks-map', {
          center: [39, -96],
          zoom: 4,
          minZoom: 4
        });

        // Add Esri World Topo base map via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(drought_map);

        var currentLayer;

        // No WMS layers for Drought outlooks so pull in WFS layers
        var droughtMonthlyLayer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_drought_outlk/MapServer/0'
        })
        var droughtSeasonalLayer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_drought_outlk/MapServer/1'
        })

        // Set and add initial feature layer to map
        currentLayer = droughtMonthlyLayer;
        $('#drought-outlook h2 span').html('Monthly');
        // Hard coding date range for now; will set up auto functions later
        $('.outlook-date').html('Valid for October 2017');
        // Show loader since layers are sometimes slow to load
        currentLayer.on('loading', function (event) {
          $('.loader').fadeIn("fast");
        });
        currentLayer.addTo(drought_map);
        currentLayer.on('load', function (event) {
          $('.loader').fadeOut("fast");
        });

        // Set up case statements for layer switch based on duration selection
        $('.duration-form', context).once('duration-select', function(e) {
          $(this).on('submit', function(e) {
            e.preventDefault();

            var selection = $('#options').val();
            var opacityVal = $('.opacity-slider__range').val();
            var duration = ["610", "814", "monthly", "seasonal"];

            switch(selection) {
              case 'monthly':
                console.log(options.value);
                removePrevLayer();
                currentLayer = droughtMonthlyLayer;
                $('#drought-outlook h2 span').html('Monthly');
                $('.outlook-date').html('October 2017');
                addNewLayer();
                break;
              case 'seasonal':
                console.log(options.value);
                removePrevLayer();
                currentLayer = droughtSeasonalLayer;
                $('#drought-outlook h2 span').html('Seasonal');
                $('.outlook-date').html('October 2017 &ndash; December 2017');
                addNewLayer();
                break;
              default:
                currentLayer = droughtMonthlyLayer;
                addNewLayer();
            }
          });
        });

        // Function to remove any existing layers
        function removePrevLayer() {
          if (drought_map.hasLayer(currentLayer)) {
            drought_map.removeLayer(currentLayer);
          }
        };

        // Function to swap layers based on duration select list option
        function addNewLayer() {
          currentLayer.on('loading', function (event) {
            console.log('start loading tiles');
            $('.loader').fadeIn("fast");
          });
          currentLayer.addTo(drought_map);
          //currentLayer.setOpacity(opacityVal);
          currentLayer.on('load', function (event) {
            console.log('all tiles loaded');
            $('.loader').fadeOut("fast");
          });
        };

        // Switch between CONUS view and Alaska view
        // based on radio button selection
        $(".map-view", context).once('change-view', function() {
          $(this).on('click', function() {
            var viewSelect = $('input[name=map-view]:checked').val();

            switch (viewSelect) {
              case 'conus':
                drought_map.setView([39, -96]);
                break;
              case 'alaska':
                drought_map.setView([64, -153]);
                break;
              default:
                drought_map.setView([39, -96]);
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
          //currentLayer.setOpacity(opacityVal);
          var percent = Math.round(opacityVal * 100);
          $('.opacity-slider__value').html(percent);
        });

        // Create marker at specific location
        var marker = L.marker([38.98970,-76.93776]).addTo(drought_map);

        // map.on('click', addMarker);

        function addMarker(e){
          // Add marker to map at click location
          var newMarker = new L.marker(e.latlng).addTo(drought_map);
        }

        // Pull in WMS layers using leaflet.wms plugin {Does not work...yet}
        //var options = {'transparent': true};
        //var source = L.WMS.source("https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer", options);
        //source.addSubLayer('1');
        //source.addTo(temp_map);
  	  }); // end .once

  	} // end attach
  };


})(Drupal, jQuery);
