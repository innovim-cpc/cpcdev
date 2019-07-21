/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
  "use strict";

  var precipmap;

  // Hide the loader initially
  $('.loader').hide();
  $('#precip-seasonal-options').hide();

  Drupal.behaviors.createPrecipMap = {
  	attach:function (context, settings) {

  	  $('#precip-outlooks-map', context).once('precip-outlooks-map', function() {
  		  // Set up map
        var precipmap = L.map('precip-outlooks-map', {
          center: [39, -96],
          zoom: 4,
          minZoom: 4
        });

        // Add Esri World Topo basemap via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(precipmap);

        var currentLayer;

        // Pull in WMS layers using Leaflet's native WMS layer support
        var precip610Layer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/WMSServer?', {
  		    layers: '0',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip814Layer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_8_14_day_outlk/MapServer/WMSServer?', {
  		    layers: '0',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precipMonthlyLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_mthly_precip_outlk/MapServer/WMSServer?', {
  		    layers: '0',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip05SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '12',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
         var precip15SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '11',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip25SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '10',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip35SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '9',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip45SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '8',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip55SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '7',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip65SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '6',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip75SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '5',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip85SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '4',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip95SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '3',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip105SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '2',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip115SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '1',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });
        var precip125SeasonalLayer = L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/WMSServer?', {
  		    layers: '0',
          format: 'image/png',
          transparent: true,
          opacity: 0.6
  		  });

        // Set up automatic date duration calculator functions
        function dates610day() {

        }

        // Set and add initial WMS layer to map
        currentLayer = precip610Layer;
        $('#precip-outlook h2 span').html('6 to 10 Day');
        // Hard coding date range for now; will set up auto functions later
        $('.outlook-date').html('Monday October 16 &ndash; Friday October 20');
        // Show loader since layers are sometimes slow to load
        currentLayer.on('loading', function (event) {
          $('.loader').fadeIn("fast");
        });
        currentLayer.addTo(precipmap);
        currentLayer.on('load', function (event) {
          $('.loader').fadeOut("fast");
        });

        // Set up case statements for layer switch based on duration selection
        $('.duration-form', context).once('duration-select', function(e) {
          
          $(this).on('submit', function(e) {
            e.preventDefault();

            var selection = $('#precip-options').val();
            var duration = ["610", "814", "monthly", "seasonal"];

            switch(selection) {
              case '610':
                $('#precip-seasonal-options').show();
                removePrevLayer();
                currentLayer = precip610Layer;
                $('#precip-outlook h2 span').html('6 to 10 Day');
                $('.outlook-date').html('Monday October 16 &ndash; Friday October 20');
                addNewLayer();
                break;
              case '814':
                $('#precip-seasonal-options').show();
                removePrevLayer();
                currentLayer = precip814Layer;
                $('#precip-outlook h2 span').html('8 to 14 Day');
                $('.outlook-date').html('Wednesday October 18 &ndash; Tuesday October 24');
                addNewLayer();
                break;
              case 'monthly':
                $('#precip-seasonal-options').hide();
                removePrevLayer();
                currentLayer = precipMonthlyLayer;
                $('#precip-outlook h2 span').html('Monthly');
                $('.outlook-date').html('October 2017');
                addNewLayer();
                break;
              case 'seasonal':
                removePrevLayer();
                $('#precip-seasonal-options').show();
                currentLayer = precip05SeasonalLayer;
                $('#precip-outlook h2 span').html('Seasonal');
                seasonalSelection();
                $('.outlook-date').html('October 2017 &ndash; December 2017');
                addNewLayer();
                break;
              default:
                currentLayer = precip610Layer;
                addNewLayer();
            }
          });
        });

        // Function to remove any existing layers
        function removePrevLayer() {
          if (precipmap.hasLayer(currentLayer)) {
            precipmap.removeLayer(currentLayer);
          }
        };

        // Function to swap layers based on duration select list option
        function addNewLayer() {
          var opacityVal = $('.opacity-slider__range').val();
          currentLayer.on('loading', function (event) {
            console.log('start loading tiles');
            $('.loader').fadeIn("fast");
          });
          currentLayer.addTo(precipmap);
          currentLayer.setOpacity(opacityVal);
          console.log(opacityVal);
          currentLayer.on('load', function (event) {
            //console.log('all tiles loaded');
            $('.loader').fadeOut("fast");
          });
        };
        
        function seasonalSelection() {
          var seasonalSelect = $('#precip-seasonal-options').val();
          switch(seasonalSelect) {
            case '0.5mn':
              removePrevLayer();
              currentLayer = precip05SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '1.5mn':
              removePrevLayer();
              currentLayer = precip15SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '2.5mn':
              removePrevLayer();
              currentLayer = precip25SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '3.5mn':
              removePrevLayer();
              currentLayer = precip35SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '4.5mn':
              removePrevLayer();
              currentLayer = precip45SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '5.5mn':
              removePrevLayer();
              currentLayer = precip55SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '6.5mn':
              removePrevLayer();
              currentLayer = precip65SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '7.5mn':
              removePrevLayer();
              currentLayer = precip75SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '8.5mn':
              removePrevLayer();
              currentLayer = precip85SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '9.5mn':
              removePrevLayer();
              currentLayer = precip95SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '10.5mn':
              removePrevLayer();
              currentLayer = precip105SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '11.5mn':
              removePrevLayer();
              currentLayer = precip115SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            case '12.5mn':
              removePrevLayer();
              currentLayer = precip125SeasonalLayer;
              $('.outlook-date').html('');
              addNewLayer();
              break;
            default:
              currentLayer = precip05SeasonalLayer;
              addNewLayer();
          }
        }

        // Switch between CONUS view and Alaska view
        // based on radio button selection
        $(".precip-map-view", context).once('change-view', function() {
          $(this).on('click', function() {
            var viewSelect = $('input[name=precip-map-view]:checked').val();

            switch (viewSelect) {
              case 'conus':
                precipmap.setView([39, -96]);
                break;
              case 'alaska':
                precipmap.setView([64, -153]);
                break;
              default:
                precipmap.setView([39, -96]);
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
        var marker = L.marker([38.98970,-76.93776]).addTo(precipmap);

        // map.on('click', addMarker);

        function addMarker(e){
          // Add marker to map at click location
          var newMarker = new L.marker(e.latlng).addTo(precipmap);
        }

        // Pull in WMS layers using leaflet.wms plugin {Does not work...yet}
        //var options = {'transparent': true};
        //var source = L.WMS.source("https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer", options);
        //source.addSubLayer('1');
        //source.addTo(precipmap);

  	  }); // end .once

  	} // end attach
  }; // end Drupal.behaviors.createPrecipMap


})(jQuery);


(function ($) {
  "use strict";
  
  Drupal.behaviors.createPrecipChart = {
  	attach:function (context, settings) {
      
      $('#temp-chart', context).once('precip-chart', function() {
      
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
          var options = {'title':'Three Category Precipitation Outlook'};

          // Instantiate and draw our chart, passing in some options.
          var chart = new google.visualization.PieChart(document.getElementById('precip-chart'));
          chart.draw(data, options);
        }
        
      }); // end .once

    } // end attach
  }; // end Drupal.behaviors.createTempChart
  
})(jQuery);
