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

        var currentLayer;

        // Pull in WMS layers using Leaflet's native WMS layer support
        var temp610Layer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/WMSServer?', {
  		    layers: '1',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp814Layer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_8_14_day_outlk/MapServer/WMSServer?', {
  		    layers: '1',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var tempMonthlyLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_mthly_temp_outlk/MapServer/WMSServer?', {
  		    layers: '0',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp05SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '12',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp15SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '11',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp25SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '10',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp35SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '9',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp45SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '8',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp55SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '7',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp65SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '6',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp75SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '5',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp85SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '4',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp95SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '3',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp105SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '2',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp115SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '1',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var temp125SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/WMSServer?', {
  		    layers: '0',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });


        // Set up automatic date duration calculator functions
        function dates610day() {

        }


        // Set and add initial WMS layer to map
        currentLayer = temp610Layer;
        $('#temp-outlook h2 span').html('6 to 10 Day');
        // Hard coding date range for now; will set up auto functions later
        $('.outlook-date').html('Monday October 16 &ndash; Friday October 20');
        // Show loader since layers are sometimes slow to load
        currentLayer.on('loading', function (event) {
          $('.loader').fadeIn("fast");
        });
        currentLayer.addTo(hazardsmap);
        currentLayer.on('load', function (event) {
          $('.loader').fadeOut("fast");
        });

        // Set up case statements for layer switch based on duration selection
        $('.duration-form', context).once('duration-select', function(e) {

          $(this).on('submit', function(e) {
            e.preventDefault();

            var selection = $('#temp-options').val();
            var duration = ["610", "814", "monthly", "seasonal"];

            switch(selection) {
              case '610':
                $('#temp-seasonal-options').hide();
                removePrevLayer();
                currentLayer = temp610Layer;
                $('#temp-outlook h2 span').html('6 to 10 Day');
                $('.outlook-date').html('Monday October 16 &ndash; Friday October 20');
                addNewLayer();
                break;
              case '814':
                $('#temp-seasonal-options').hide();
                removePrevLayer();
                currentLayer = temp814Layer;
                $('#temp-outlook h2 span').html('8 to 14 Day');
                $('.outlook-date').html('Wednesday October 18 &ndash; Tuesday October 24');
                addNewLayer();
                break;
              case 'monthly':
                $('#temp-seasonal-options').hide();
                removePrevLayer();
                currentLayer = tempMonthlyLayer;
                $('#temp-outlook h2 span').html('Monthly');
                $('.outlook-date').html('October 2017');
                addNewLayer();
                break;
              case 'seasonal':
                removePrevLayer();
                $('#temp-seasonal-options').show();
                currentLayer = temp05SeasonalLayer;
                $('#temp-outlook h2 span').html('Seasonal');
                seasonalSelection();
                $('.outlook-date').html('October 2017 &ndash; December 2017');
                addNewLayer();
                break;
              default:
                currentLayer = temp610Layer;
                addNewLayer();
            }
          });
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

        function seasonalSelection() {
          var seasonalSelect = $('#temp-seasonal-options').val();
          switch(seasonalSelect) {
            case '0.5mn':
              removePrevLayer();
              currentLayer = temp05SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '1.5mn':
              removePrevLayer();
              currentLayer = temp15SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '2.5mn':
              removePrevLayer();
              currentLayer = temp25SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '3.5mn':
              removePrevLayer();
              currentLayer = temp35SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '4.5mn':
              removePrevLayer();
              currentLayer = temp45SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '5.5mn':
              removePrevLayer();
              currentLayer = temp55SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '6.5mn':
              removePrevLayer();
              currentLayer = temp65SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '7.5mn':
              removePrevLayer();
              currentLayer = temp75SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '8.5mn':
              removePrevLayer();
              currentLayer = temp85SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '9.5mn':
              removePrevLayer();
              currentLayer = temp95SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '10.5mn':
              removePrevLayer();
              currentLayer = temp105SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '11.5mn':
              removePrevLayer();
              currentLayer = temp115SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '12.5mn':
              removePrevLayer();
              currentLayer = temp125SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            default:
              currentLayer = temp05SeasonalLayer;
              addNewLayer();
          }
        }

        // Switch between CONUS view and Alaska view
        // based on radio button selection
        $(".temp-map-view", context).once('change-view', function() {
          $(this).on('click', function() {
            var viewSelect = $('input[name=temp-map-view]:checked').val();

            switch (viewSelect) {
              case 'conus':
                map.setView([39, -96]);
                break;
              case 'alaska':
                map.setView([64, -153]);
                break;
              default:
                map.setView([39, -96]);
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

//  	  }); // end .once

//  	} // end attach
//  }; // end Drupal.behaviors.createTempMap


})(jQuery);


(function ($) {
  "use strict";

  Drupal.behaviors.createTempChart = {
  	attach:function (context, settings) {

      $('#temp-chart', context).once('temp-chart', function() {

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {

          // Create the data table.
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Topping');
          data.addColumn('number', 'Slices');
          data.addRows([
            ['Above Normal', 3],
            ['Below Normal', 1],
            ['Near Normal', 1]
          ]);

          // Set chart options
          var options = {'title':'Three Category Temperature Outlook'};

          // Instantiate and draw our chart, passing in some options.
          var chart = new google.visualization.PieChart(document.getElementById('temp-chart'));
          chart.draw(data, options);
        }

      }); // end .once

    } // end attach
  }; // end Drupal.behaviors.createTempChart

})(jQuery);
