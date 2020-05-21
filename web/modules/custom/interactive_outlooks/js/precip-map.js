/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
  "use strict";

   //Drupal.behaviors.createPrecipMap = {
   	//attach:function (context, settings) {

   	  //$('#precip-map', context).once('.precip-map', function() {

  		  // Create the map
        const precipmap = L.map('precip-map', {
          center: [38, -96],
          zoomSnap: 0.1,
          zoom: 3.9,
          minZoom: 3.9
        });

        // Add Esri World Topo base map via Esri Leaflet plugin
        L.esri.basemapLayer('Gray').addTo(precipmap);

        // Get URL to place boundaries layer
        const boundariesUrl = 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/';
        //const boundariesUrl = 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS/nws_reference_map/MapServer/3'

        // Create a map pane for the boundaries
        precipmap.createPane('boundaries');

        // Define the created pane when creating the dynamicMapLayer
        L.esri.dynamicMapLayer({
          url: boundariesUrl,
          pane: 'boundaries',
          opacity: 0.5
        }).addTo(precipmap);
        // Define the created pane when creating the feature layer
        /*L.esri.featureLayer({
          url: boundariesUrl,
          pane: 'boundaries',
          style: function (feature) {
            return { opacity: 0.8 };
          }
        }).addTo(precipmap);*/

        // Create a map pane for the outlooks
        precipmap.createPane('outlooks');

        // Create variables from all the Precipitation layers
        const precip610dayLayer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/1',
          pane: 'outlooks'
        });
        const precip814dayLayer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_8_14_day_outlk/MapServer/1',
          pane: 'outlooks'
        });
        const precipMonthlyLayer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_mthly_precip_outlk/MapServer/0',
          pane: 'outlooks'
        });
        const precip3MonthLead1Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/0',
          pane: 'outlooks'
        });
        const precip3MonthLead2Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/1',
          pane: 'outlooks'
        });
        const precip3MonthLead3Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/2',
          pane: 'outlooks'
        });
        const precip3MonthLead4Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/3',
          pane: 'outlooks'
        });
        const precip3MonthLead5Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/4',
          pane: 'outlooks'
        });
        const precip3MonthLead6Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/5',
          pane: 'outlooks'
        });
        const precip3MonthLead7Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/6',
          pane: 'outlooks'
        });
        const precip3MonthLead8Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/7',
          pane: 'outlooks'
        });
        const precip3MonthLead9Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/8',
          pane: 'outlooks'
        });
        const precip3MonthLead10Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/9',
          pane: 'outlooks'
        });
        const precip3MonthLead11Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/10',
          pane: 'outlooks'
        });
        const precip3MonthLead12Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/11',
          pane: 'outlooks'
        });
        const precip3MonthLead13Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/12',
          pane: 'outlooks'
        });

        // Search by address
        // Create the geocoding control and add it to the map
        var searchControl = L.esri.Geocoding.geosearch().addTo(precipmap);

        // Create an empty layer group to store the results and add it to the map
        var results = L.layerGroup().addTo(precipmap);

        // Listen for the results event and add every result to the map
        searchControl.on("results", function(data) {
          results.clearLayers();
          for (var i = data.results.length - 1; i >= 0; i--) {
            addMarker(data.results[i]);
          }
        });

        var leadLabel;
        var lead1Label;
        var lead2Label;
        var lead3Label;
        var lead4Label;
        var lead5Label;
        var lead6Label;
        var lead7Label;
        var lead8Label;
        var lead9Label;
        var lead10Label;
        var lead11Label;
        var lead12Label;
        var lead13Label;
        var validDateMonthly;
        var currentLayerName;
        var count = 0;


      function formatLeadDates(x){
        switch(x.substring(0,3)) {
          case 'JFM':
            leadLabel = 'Jan-Feb-Mar ' + x.substring(x.length - 4, x.length);
            break;
          case 'FMA':
            leadLabel = 'Feb-Mar-Apr ' + x.substring(x.length - 4, x.length);
            break;
          case 'MAM':
            leadLabel = 'Mar-Apr-May ' + x.substring(x.length - 4, x.length);
            break;
          case 'AMJ':
            leadLabel = 'Apr-May-Jun ' + x.substring(x.length - 4, x.length);
            break;
          case 'MJJ':
            leadLabel = 'May-Jun-Jul ' + x.substring(x.length - 4, x.length);
            break;
          case 'JJA':
            leadLabel = 'Jun-Jul-Aug ' + x.substring(x.length - 4, x.length);
            break;
          case 'JAS':
            leadLabel = 'Jul-Aug-Sep ' + x.substring(x.length - 4, x.length);
            break;
          case 'ASO':
            leadLabel = 'Aug-Sep-Oct ' + x.substring(x.length - 4, x.length);
            break;
          case 'SON':
            leadLabel = 'Sep-Oct-Nov ' + x.substring(x.length - 4, x.length);
            break;
          case 'OND':
            leadLabel = 'Oct-Nov-Dec ' + x.substring(x.length - 4, x.length);
            break;
          case 'NDJ':
            leadLabel = 'Nov-Dec-Jan ' + x.substring(x.length - 9, x.length);
            break;
          case 'DJF':
            leadLabel = 'Dec-Jan-Feb ' + x.substring(x.length - 9, x.length);
            break;
          default:
            leadLabel = x;
        }
      }

      // Query lead layers to get lead dates for drop down list
      precip3MonthLead1Layer.query()
        .run(function(error, featureCollection){
          formatLeadDates(featureCollection.features[0].properties.valid_seas);
          $('#lead-options-precip option[value="precip-lead-1"]').text(leadLabel);
          lead1Label = leadLabel;
      });

        precip3MonthLead2Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options-precip option[value="precip-lead-2"]').text(leadLabel);
            lead2Label = leadLabel;
        });

        precip3MonthLead3Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options-precip option[value="precip-lead-3"]').text(leadLabel);
            lead3Label = leadLabel;
        });

        precip3MonthLead4Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options-precip option[value="precip-lead-4"]').text(leadLabel);
            lead4Label = leadLabel;
        });
        precip3MonthLead5Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options-precip option[value="precip-lead-5"]').text(leadLabel);
            lead5Label = leadLabel;
        });
        precip3MonthLead6Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options-precip option[value="precip-lead-6"]').text(leadLabel);
            lead6Label = leadLabel;
        });
        precip3MonthLead7Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options-precip option[value="precip-lead-7"]').text(leadLabel);
            lead7Label = leadLabel;
        });
        precip3MonthLead8Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options-precip option[value="precip-lead-8"]').text(leadLabel);
            lead8Label = leadLabel;
        });
        precip3MonthLead9Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options-precip option[value="precip-lead-9"]').text(leadLabel);
            lead9Label = leadLabel;
        });
        precip3MonthLead10Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options-precip option[value="precip-lead-10"]').text(leadLabel);
            lead10Label = leadLabel;
        });
        precip3MonthLead11Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options-precip option[value="precip-lead-11"]').text(leadLabel);
            lead11Label = leadLabel;
        });
        precip3MonthLead12Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options-precip option[value="precip-lead-12"]').text(leadLabel);
            lead12Label = leadLabel;
        });
        precip3MonthLead13Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options-precip option[value="precip-lead-13"]').text(leadLabel);
            lead13Label = leadLabel;
        });

        // Add initial layer to map
        precip610dayLayer.addTo(precipmap);

        var get_start_date;
        var get_end_date;
        var get_fcst_date;
        var get_valid_seas;
        var start_date_plus1;
        var end_date_plus1;
        var fcst_date_plus1;
        var start_date;
        var end_date;
        var fcst_date;
        var file_date;
        var valid_seas;

        // Set current layer
        var currentLayer = precip610dayLayer;
        currentLayerName = "precip610dayLayer";
        // Initial settings for 6-10 day layer
        currentLayer.on('load', iterateFeatures);

        // Initialize 6-10 day layer
        precip610dayLayer.query()
        .run(function(error, featureCollection) {
          iterateFeatures();

          get_start_date = new Date(featureCollection.features[0].properties.start_date);
          get_end_date = new Date(featureCollection.features[0].properties.end_date);
          get_fcst_date = new Date(featureCollection.features[0].properties.fcst_date);
          file_date = new Date(featureCollection.features[0].properties.idp_filedate);

          // Add a day to the date for correct display
          start_date_plus1 = get_start_date.setDate(get_start_date.getDate() + 1);
          end_date_plus1 = get_end_date.setDate(get_end_date.getDate() + 1);
          fcst_date_plus1 = get_end_date.setDate(get_fcst_date.getDate() + 1);

          // Create new Date object
          start_date = new Date(start_date_plus1);
          end_date = new Date(end_date_plus1);
          fcst_date = new Date(fcst_date_plus1);

          // Set up options for date display
          var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

          // Format dates
          start_date = start_date.toLocaleDateString("en-US", options);
          end_date = end_date.toLocaleDateString("en-US", options);
          fcst_date = fcst_date.toLocaleDateString("en-US", options);

          // Set initial title and valid period for 6-10 day precip outlook
          $('#precip-map-header .title').text("U.S. 6 to 10 Day Precipitation Outlook");
          $('#precip-map-header .valid-dates').html("Valid for " + start_date + " &ndash; " + end_date + "<br>Released: " + fcst_date);

          marker.bindPopup(function (layer){
            return L.Util.template("College Park, MD");
          }).openPopup();
        });

        var previousLayer = "";

        $('#precip-map-header .title').text("U.S. 6 to 10 Day Precipitation Outlook");
        //$('#precip-map-header .valid-dates').text("Valid for " + fcst_date + ", Released " + file_date);
        $('#lead-selector-precip').hide();


        function iterateFeatures () {
          currentLayer.eachFeature(function(layer) {

            layer.setStyle({
              fillOpacity: 0.6
            });

            get_start_date = new Date(layer.feature.properties.start_date);
            get_end_date = new Date(layer.feature.properties.end_date);
            get_fcst_date = new Date(layer.feature.properties.fcst_date);
            get_valid_seas = layer.feature.properties.valid_seas;

            // Add a day to the date for correct display
            start_date_plus1 = get_start_date.setDate(get_start_date.getDate() + 1);
            end_date_plus1 = get_end_date.setDate(get_end_date.getDate() + 1);
            fcst_date_plus1 = get_fcst_date.setDate(get_fcst_date.getDate() + 1);

            // Create new Date object
            start_date = new Date(start_date_plus1);
            end_date = new Date(end_date_plus1);
            fcst_date = new Date(fcst_date_plus1);

            // Set up options for date display
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            // Format dates
            start_date = start_date.toLocaleDateString("en-US", options);
            end_date = end_date.toLocaleDateString("en-US", options);
            fcst_date = fcst_date.toLocaleDateString("en-US", options);

            if (currentLayerName === "precip610dayLayer") {
              $('#precip-map-header .valid-dates').html("Valid: " + start_date + " - " + end_date + "<br>Released: " + fcst_date);
            }
            else if (currentLayerName === "precip814dayLayer"){
              $('#precip-map-header .valid-dates').html("Valid: " + start_date + " - " + end_date + "<br> Released: " + fcst_date);
            }
            else if (currentLayerName === "precipMonthlyLayer"){
              $('#precip-map-header .valid-dates').html("Valid: " + get_valid_seas + "<br> Released: " + fcst_date);
            }
            else if (currentLayerName === "Lead1"){
              $('#precip-map-header .valid-dates').html("Valid: " + lead1Label + "<br> Released: " + fcst_date);
            }


            if (layer.feature.properties.cat === "Above"){

              // Get probability of the layer
              switch(layer.feature.properties.prob) {
                case 90:
                  layer.bindTooltip("90% chance of Above Average Precipitation");
                  break;
                case 80:
                  layer.bindTooltip("80% - 90% chance of Above Average Precipitation");
                  break;
                case 70:
                  layer.bindTooltip("70% - 80% chance of Above Average Precipitation");
                  break;
                case 60:
                  layer.bindTooltip("60% - 70% chance of Above Average Precipitation");
                  break;
                case 50:
                  layer.bindTooltip("50% - 60% chance of Above Average Precipitation");
                  break;
                case 40:
                  layer.bindTooltip("40% - 50% chance of Above Average Precipitation");
                  break;
                case 33:
                  layer.bindTooltip("33% chance of Above Average Precipitation");
                  break;
              }

            } else if (layer.feature.properties.cat === "Normal") {
              layer.bindTooltip("36% chance of Normal Precipitation");
            } else if (layer.feature.properties.cat === "EC") {
              layer.removeFrom(precipmap);
            } else if (layer.feature.properties.cat === "Below") {
              switch(layer.feature.properties.prob) {
                case 33:
                  layer.bindTooltip("33% chance of Below Average Precipitation");
                  break;
                case 40:
                  layer.bindTooltip("40% - 50% chance of Below Average Precipitation");
                  break;
                case 50:
                  layer.bindTooltip("50% - 60% chance of Below Average Precipitation");
                  break;
                case 60:
                  layer.bindTooltip("60% - 70% chance of Below Average Precipitation");
                  break;
                case 70:
                  layer.bindTooltip("70% - 80% chance of Below Average Precipitation");
                  break;
                case 80:
                  layer.bindTooltip("80% - 90% chance of Below Average Precipitation");
                  break;
                case 90:
                  layer.bindTooltip("90% chance of Below Average Precipitation");
                  break;
              }
            }
          });

          // Repopulate the pie chart
          if (region === "AK") {
            getPrecipHandlerAlaska(coord);
          } else {
            getPrecipHandler(coord);
          }

        }

        var precip610dayChecked = $('#precip-map__view-select input[type=radio][id=precip610day]:checked');
        var precip814dayChecked = $('#precip-map__view-select input[type=radio][id=precip814day]:checked');

        if (precip610dayChecked) {
          $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/610day/610prcp.new.gif');
        } else if (precip814dayChecked) {
          $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/814day/814prcp.new.gif');
        }

        // Change the layers of the map based on dropdown list selection
        $('input[name=precip-map-duration]').on('change', function() {
          if (this.value == 'precip610day') {
            removePrevLayer();
            currentLayer = precip610dayLayer;
            currentLayerName = "precip610dayLayer";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
            //hide Select a Lead
            $('#lead-selector-precip').hide();
            $('#precip-map-header .title').text("U.S. 6 to 10 Day Precipitation Outlook");
            //$('#precip-map-header .valid-dates').html("Valid: " + validDate610Day + "<br>Released: " + fcst_date);
            $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/610day/610prcp.new.gif');
          }
          else if (this.value == 'precip814day') {
            removePrevLayer();
            currentLayer = precip814dayLayer;
            currentLayerName = "precip814dayLayer";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
            //hide Select a Lead
            $('#lead-selector-precip').hide();
            $('#precip-map-header .title').text("U.S. 8 to 14 Day Precipitation Outlook");
            // $('#precip-map-header .valid-dates').html("Valid: " + validDate814Day + "<br> Released: " + fcst_date);
            $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/814day/814prcp.new.gif');
          }
          else if (this.value == 'precip-monthly') {
            removePrevLayer();
            currentLayer = precipMonthlyLayer;
            currentLayerName = "precipMonthlyLayer";
            currentLayer.on('load', iterateFeatures);
            currentLayer.addTo(precipmap);
            //hide Select a Lead
            $('#lead-selector-precip').hide();
            $('#precip-map-header .title').text("U.S. Monthly Precipitation Outlook");
            //$('#precip-map-header .valid-dates').html("Valid: " + validDateMonthly + "<br> Released: " + fcst_date);
            $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead14/off14_prcp.gif');
          }
          else if (this.value == 'precip-3month') {
            removePrevLayer();
            currentLayer = precip3MonthLead1Layer;
            currentLayerName = "Lead1";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
            //Show Select a Lead
            $('#lead-selector-precip').show();
            $('#precip-map-header .title').text("U.S. 3 Month Precipitation Outlook");
            $('#precip-map-header .valid-dates').html("Valid: " + lead1Label + "<br> Released: " + fcst_date);
            $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead01/off01_prcp.gif');
          }
        });

        // Function to remove any existing layers
        function removePrevLayer() {
          if (precipmap.hasLayer(currentLayer)) {
            precipmap.removeLayer(currentLayer);
          }
        };

        //change the map to the correct area
        $('input[type=radio][name=precip-map-view]').on('change',function() {
          if (this.value == 'conus') {
            // precipmap.setView(new L.LatLng(38, -96), 3.9)
            precipmap.setView(new L.LatLng(38, -96), 3.9)
            //set default marker back to College Park, MD
            if (marker) {
              precipmap.removeLayer(marker);
            }
            //add marker to map at click location
            var init_coord = L.latLng(38.98970, -76.93776);

            //var marker;
            //add initial marker
            marker = new L.marker(init_coord).addTo(precipmap);
            marker.bindPopup(function (layer){
              return L.Util.template("College Park, MD");
            }).openPopup();



            var latitude = 38.989697;
            var longitude = -76.937759;
            var coord = latitude.toFixed(2) + ", " + longitude.toFixed(2);

            //locate the closest town/city within 160 miles
            //getForecast(e.Latlng = 64.2,-149.2);

            //reset the variables before loading new data, prevents old data from being displayed if the pie chart loads before the new data refreshes
            mint_norm = null;
            maxt_norm = null;
            precip_abv = null;
            precip_blo =  null;
            precip_norm = null;

            getPrecipHandler(coord);
          }
          else if (this.value == 'alaska') {
            // precipmap.setView(new L.LatLng(64.2,-149.4), 3.9)
            precipmap.setView(new L.LatLng(64.2,-149.4), 3.9)
            //set default marker for Anchorage, Alaska
            if (marker) {
              precipmap.removeLayer(marker);
            }
            //add marker to map at click location
            var init_coord = L.latLng(61.217381, -149.863129);

            //var marker;
            //add initial marker
            marker = new L.marker(init_coord).addTo(precipmap);
            marker.bindPopup(function (layer){
              return L.Util.template("Anchorage, AK");
            }).openPopup();



            var latitude = 61.217381;
            var longitude = -149.863129;
            coord = latitude.toFixed(2) + ", " + longitude.toFixed(2);

            //locate the closest town/city within 160 miles
            //getForecast(e.Latlng = 64.2,-149.2);

            //reset the variables before loading new data, prevents old data from being displayed if the pie chart loads before the new data refreshes
            mint_norm = null;
            maxt_norm = null;
            precip_abv = null;
            precip_blo =  null;
            precip_norm = null;

            getPrecipHandlerAlaska(coord);
          }
        });

        var precipSlider = $('#precip-opacity-level')[0];
        // var output = document.getElementById("sliderValue");
        var precipOutput = $('.precip-opacity-slider__value')[0];

        var opacityVal = $('.precip-opacity-slider__range').val();
        // Convert opacity decimal value to percent
        var percent = Math.round(precipSlider.value * 100);
        // Write percent value in html label area
        $('.precip-opacity-slider__value').html(percent);

        precipOutput.innerHTML = percent;
        precipSlider.oninput = function() {
          precipOutput.innerHTML = Math.round(this.value * 100);

          currentLayer.eachFeature(function(layer){
            layer.setStyle({
              fillOpacity: (precipSlider.value)
            });
          });
        }

        $('[name=lead-options-precip]').on('change', function() {
          if (this.value == 'precip-lead-1') {
            removePrevLayer();
            currentLayer = precip3MonthLead1Layer;
            currentLayerName = "Lead1";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead1Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead01/off01_prcp.gif');
          }
          else if (this.value == 'precip-lead-2') {
            removePrevLayer();
            currentLayer = precip3MonthLead2Layer;
            currentLayerName = "Lead2";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead2Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead02/off02_prcp.gif');
          }
          else if (this.value == 'precip-lead-3') {
            removePrevLayer();
            currentLayer = precip3MonthLead3Layer;
            currentLayerName = "Lead3";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead3Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead03/off03_prcp.gif');
          }
          else if (this.value == 'precip-lead-4') {
            removePrevLayer();
            currentLayer = precip3MonthLead4Layer;
            currentLayerName = "Lead4";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead4Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead04/off04_prcp.gif');
          }
          else if (this.value == 'precip-lead-5') {
            removePrevLayer();
            currentLayer = precip3MonthLead5Layer;
            currentLayerName = "Lead5";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead5Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead05/off05_prcp.gif');
          }
          else if (this.value == 'precip-lead-6') {
            removePrevLayer();
            currentLayer = precip3MonthLead6Layer;
            currentLayerName = "Lead6";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead6Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead06/off06_prcp.gif');
          }
          else if (this.value == 'precip-lead-7') {
            removePrevLayer();
            currentLayer = precip3MonthLead7Layer;
            currentLayerName = "Lead7";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead7Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead07/off07_prcp.gif');
          }
          else if (this.value == 'precip-lead-8') {
            removePrevLayer();
            currentLayer = precip3MonthLead8Layer;
            currentLayerName = "Lead8";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead8Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead08/off08_prcp.gif');
          }
          else if (this.value == 'precip-lead-9') {
            removePrevLayer();
            currentLayer = precip3MonthLead9Layer;
            currentLayerName = "Lead9";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead9Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead09/off09_prcp.gif');
          }
          else if (this.value == 'precip-lead-10') {
            removePrevLayer();
            currentLayer = precip3MonthLead10Layer;
            currentLayerName = "Lead10";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead10Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead10/off10_prcp.gif');
          }
          else if (this.value == 'precip-lead-11') {
            removePrevLayer();
            currentLayer = precip3MonthLead11Layer;
            currentLayerName = "Lead11";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead11Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead11/off11_prcp.gif');
          }
          else if (this.value == 'precip-lead-12') {
            removePrevLayer();
            currentLayer = precip3MonthLead12Layer;
            currentLayerName = "Lead12";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead12Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead12/off12_prcp.gif');
          }
          else if (this.value == 'precip-lead-13') {
            removePrevLayer();
            currentLayer = precip3MonthLead13Layer;
            currentLayerName = "Lead13";
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .title').html("U.S. 3 Month Precipitation Outlook");
           $('#precip-map-header .valid-dates').html("Valid: " + lead13Label + "<br> Released: " + fcst_date);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead13/off13_prcp.gif');
          }
        });

        var pcpn_norm;
        var precip_abv;
        var precip_blo;
        var precip_norm;
        var coord;
        var region;

        //init table load
		    var init_coord = L.latLng(38.98970, -76.93776);

        var marker;
        //add initial marker
        marker = new L.marker(init_coord).addTo(precipmap);

        // document.getElementById('location-container-precip').innerHTML =
        //     "<a href= https://forecast.weather.gov/MapClick.php?lat=38.98970" +
        //     "&amp;lon=-76.93776 " +
        //     "target=_blank title='Link to 7 Day Forecast'>7 Day Forecast for College Park, MD"

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        //create tables onClick
        coord = init_coord.lat.toFixed(2) + ", " + init_coord.lng.toFixed(2);
        var initialLoad = true;
        precipmap.on('load', getPrecipHandler(coord));
        var chartPrecip;
        var options = {
          colors:['#99FF66','#DEB887','#EBEBEB'],
          //b22222
          pieSliceText: 'percentage',
          pieSliceTextStyle: {color: 'black', fontSize: 12},
          is3D:'true',
          tooltip: {text: 'percentage'},
          title:'Three Category Precipitation Outlook',
          width:400,
          height:300
        };

        function drawChartInitial(pcpn_norm,precip_abv,precip_blo,precip_norm) {

          // Create the data table.
          var data = google.visualization.arrayToDataTable([
            ['Category', 'Count'],
            ['Above Normal', eval(precip_abv)],
            ['Below Normal', eval(precip_blo)],
            ['Near Normal', eval(precip_norm)]
          ]);

        	if (precip_norm > -200) {
        		document.getElementById("chart-div-precip-label").innerHTML=
                "<font color=black>Three Category Precipitation Outlook<br>Normal Precipitation: </font><strong>"
                + eval(pcpn_norm).toFixed(2) + "</strong></a>";
      		}
          else {
        		document.getElementById("chart-div-precip-label").innerHTML=
              "<font color=black>Three Category Precipitation Outlook<br>Normal Precipitation: N/A</font></a>";
        	}
          // Instantiate and draw our chart, passing in some options.
          chartPrecip = new google.visualization.PieChart(document.getElementById('precip-chart'));
          chartPrecip.draw(data, options);
          initialLoad = false;
        }

        precipmap.on('click', addMarker);

        function addMarker(e){
          if (marker) {
            precipmap.removeLayer(marker);
          }
          //add marker to map at click location
          marker = new L.marker(e.latlng).addTo(precipmap);

          var latitude = e.latlng.lat;
          var longitude = e.latlng.lng;
          coord = latitude.toFixed(2) + ", " + longitude.toFixed(2);

          //locate the closest town/city within 160 miles
          getForecast(e);
          //create tables onClick
          //reset the variables before loading new data, prevents old data from being displayed if the pie chart loads before the new data refreshes
          pcpn_norm = null;
          precip_abv = null;
          precip_blo = null;
          precip_norm =  null;

          if (region == "AK"){
            getPrecipHandlerAlaska(coord);
          }
          else
          {
            getPrecipHandler(coord);
          }

        }

        function getForecast(e){
          //build query parameters
          var latitude = e.latlng.lat;
          var longitude = e.latlng.lng;

          var errDisp = 'There are no features at this location';
          var errMapDisp = 'Data not available. Please use the Alaska map';
          var fatalerrDisp = 'An error has occured. Please try again';

          var query = L.esri.query({
            url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_ZIP_Codes/FeatureServer/0'
          });
          //20 mile radius
          query.nearby(e.latlng, 32186);
          query.returnGeometry = false;
          query.outSpatialReference = {'wkid': 102100};
          query.run(function (error, featureCollection, response){
            if (error){
              console.log(error);
              return;
            }
            // document.getElementById('location-container-precip').innerHTML =
            //     "<a href= https://forecast.weather.gov/MapClick.php?lat=" +
            //     latitude.toFixed(2)+"&amp;lon="+ longitude.toFixed(2) +
            //     " target=_blank title='Link to 7 Day Forecast'>7 Day Forecast for " +
            //     featureCollection.features[0].properties.PO_NAME + ", "+ featureCollection.features[0].properties.STATE+"</a>";
            //     region = featureCollection.features[0].properties.STATE;
            marker.bindPopup(function (layer){
              region = featureCollection.features[0].properties.STATE;
              return L.Util.template(featureCollection.features[0].properties.PO_NAME + ", "+ featureCollection.features[0].properties.STATE);
            }).openPopup();
          })
        }

      function getPrecipHandler(coord) {
    		var xmlHttp = getXMLHttp();
    		xmlHttp.onreadystatechange = function() {
    			//console.log(xmlHttp.readyState);
    			if (xmlHttp.readyState==4 && xmlHttp.status==200) {
    				HandleResponse_Precip(xmlHttp.responseText);
          }
        }
          //xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/610day/interactive/includes/get_precip_pie.php?coord="+coord+"&region=conus", true);

        //get the correct data based on which layer is selected (including Leads)
          if (currentLayerName == "precip610dayLayer") {
            xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/610day/interactive/includes/get_precip_pie.php?coord="+coord+"&region=conus", true);
          } else if (currentLayerName == "precip814dayLayer") {
            xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/814day/interactive/includes/get_precip_pie.php?coord="+coord+"&region=conus", true);
          } else if (currentLayerName == "precipMonthlyLayer"){
            xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead14/interactive/includes/get_precip_pie.php?coord="+coord+"&region=conus", true);
          } else {
            xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/long_range/interactive/includes/get_precip_pie.php?coord="+coord+"&region=conus&lead="+ currentLayerName, true);
            console.log(currentLayerName);
          }
    			xmlHttp.send(null);
      }

      function getPrecipHandlerAlaska(coord) {
    		var xmlHttp = getXMLHttp();
    		xmlHttp.onreadystatechange = function() {
    			//console.log(xmlHttp.readyState);
    			if (xmlHttp.readyState==4 && xmlHttp.status==200) {
    				HandleResponse_Precip(xmlHttp.responseText);
          }
        }

        //xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/610day/interactive/includes/get_precip_pie.php?coord="+coord+"&region=alaska", true);

        // Get the correct data based on which layer is selected (including Leads)
        if (currentLayerName == "precip610dayLayer") {
          xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/610day/interactive/includes/get_precip_pie.php?coord="+coord+"&region=alaska", true);
        }
        else if (currentLayerName == "precip814dayLayer") {
          xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/814day/interactive/includes/get_precip_pie.php?coord="+coord+"&region=alaska", true);
        }
        else if (currentLayerName == "precipMonthlyLayer"){
          xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead14/interactive/includes/get_preci_pie.php?coord="+coord+"&region=alaska", true);
        }
        else {
          xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/long_range/interactive/includes/get_precip_pie.php?coord="+coord+"&region=alaska&lead="+ currentLayerName, true);
        }
        xmlHttp.send(null);
      }


      function HandleResponse_Precip(response) {
    		response = response.split('#');
        pcpn_norm = response[0];
  			precip_abv = response[1];
  			precip_blo = response[2];
  			precip_norm = response[3];
        if (initialLoad) {
          if (pcpn_norm === null) {
            drawChartInitial(pcpn_norm,precip_abv,precip_blo,precip_norm);
          } else {
            setTimeout(function() {
              drawChartInitial(pcpn_norm,precip_abv,precip_blo,precip_norm);
            }, 700);
          }
        } else {
          if (pcpn_norm === null) {
            drawChart(pcpn_norm,precip_abv,precip_blo,precip_norm);
          } else {
            setTimeout(function() {
              drawChart(pcpn_norm,precip_abv,precip_blo,precip_norm);
            }, 700);
          }
        }
      }


      function drawChart(pcpn_norm,precip_abv,precip_blo,precip_norm) {
        // Map data to legend
        var data = google.visualization.arrayToDataTable([
          ['Category', 'Count'],
          ['Above Normal', eval(precip_abv)],
          ['Below Normal', eval(precip_blo)],
          ['Near Normal', eval(precip_norm)]
        ]);

        if (pcpn_norm > -200) {
          document.getElementById("chart-div-precip-label").innerHTML=
              "<font color=black>Three Category Precipitation Outlook<br>Normal Precipitation: </font><strong>"
              + eval(pcpn_norm).toFixed(2) + "</strong></a>";
              console.log(pcpn_norm);
        } else {
          document.getElementById("chart-div-precip-label").innerHTML=
            "<font color=black>Three Category Precipitation Outlook<br>Normal Precipitation: N/A</font></a>";
        }
        chartPrecip = new google.visualization.PieChart(document.getElementById('precip-chart'));
        chartPrecip.draw(data, options);
      }


      function getXMLHttp() {
    		var xmlHttp;
    		try {
    		  // Firefox, Opera 8.0+, Safari
    		  xmlHttp = new XMLHttpRequest();
    		}
        catch(e) {
    		  // Internet Explorer
      		try {
      		  xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
      		}
          catch(e) {
        		try {
        			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        		}
            catch(e) {
        			alert("Your browser does not support AJAX!")
        			return false;
        		}
      		}
    		}
    	  return xmlHttp;
    	}

      precipmap.invalidateSize();

      //}); // .once
    //} // attach
  //}; // behaviors

})(jQuery);
