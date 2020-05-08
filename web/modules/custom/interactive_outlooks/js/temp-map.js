/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
  "use strict";

   //Drupal.behaviors.createtempMap = {
   	//attach:function (context, settings) {

   	  //$('#temp-outlooks-map', context).once('#temp-map', function() {

  		  // Create the map
        const tempmap = L.map('temp-map', {
          center: [38, -96],
          zoomSnap: 0.1,
          zoom: 3.9,
          minZoom: 3.9
        });

        // Add Esri World Topo base map via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(tempmap);

        // Create variables from all the Temperature layers
        const temp610dayLayer = L.esri.featureLayer({
          url:'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/0'
        }).addTo(tempmap);
        const temp814dayLayer = L.esri.featureLayer({
          url:'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_8_14_day_outlk/MapServer/0'
        });
        const tempMonthlyLayer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_mthly_temp_outlk/MapServer/0'
        });
        const temp3MonthLead1Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/0'
        });
        const temp3MonthLead2Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/1'
        });
        const temp3MonthLead3Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/2'
        });
        const temp3MonthLead4Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/3'
        });
        const temp3MonthLead5Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/4'
        });
        const temp3MonthLead6Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/5'
        });
        const temp3MonthLead7Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/6'
        });
        const temp3MonthLead8Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/7'
        });
        const temp3MonthLead9Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/8'
        });
        const temp3MonthLead10Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/9'
        });
        const temp3MonthLead11Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/10'
        });
        const temp3MonthLead12Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/11'
        });
        const temp3MonthLead13Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/12'
        });

        // Search by address
        // Create the geocoding control and add it to the map
        var searchControl = L.esri.Geocoding.geosearch().addTo(tempmap);

        // Create an empty layer group to store the results and add it to the map
        var results = L.layerGroup().addTo(tempmap);

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
        var validDate610Day;
        var validDate814Day
        var validDateMonthly;

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
          return leadLabel;
        }


      tempMonthlyLayer.query()
        .run(function(error, featureCollection){
          //formatLeadDates(featureCollection.features[0].properties.valid_seas);
          //$('#lead-options-precip option[value="precip-lead-1"]').text(leadLabel);
          validDateMonthly = featureCollection.features[0].properties.valid_seas;
        });
        tempMonthlyLayer.query()
        .run(function(error, featureCollection){
          //formatLeadDates(featureCollection.features[0].properties.valid_seas);
          //$('#lead-options-precip option[value="precip-lead-1"]').text(leadLabel);
          validDateMonthly = featureCollection.features[0].properties.valid_seas;
        });

        temp3MonthLead1Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-1"]').text(leadLabel);
            lead1Label = leadLabel;
        });

        temp3MonthLead2Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-2"]').text(leadLabel);
            lead2Label = leadLabel;
        });

        temp3MonthLead3Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-3"]').text(leadLabel);
            lead3Label = leadLabel;
        });

        temp3MonthLead4Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-4"]').text(leadLabel);
            lead4Label = leadLabel;
        });
        temp3MonthLead5Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-5"]').text(leadLabel);
            lead5Label = leadLabel;
        });
        temp3MonthLead6Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-6"]').text(leadLabel);
            lead6Label = leadLabel;
        });
        temp3MonthLead7Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-7"]').text(leadLabel);
            lead7Label = leadLabel;
        });
        temp3MonthLead8Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-8"]').text(leadLabel);
            lead8Label = leadLabel;
        });
        temp3MonthLead9Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-9"]').text(leadLabel);
            lead9Label = leadLabel;
        });
        temp3MonthLead10Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-10"]').text(leadLabel);
            lead10Label = leadLabel;
        });
        temp3MonthLead11Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-11"]').text(leadLabel);
            lead11Label = leadLabel;
        });
        temp3MonthLead12Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-12"]').text(leadLabel);
            lead12Label = leadLabel;
        });
        temp3MonthLead13Layer.query()
          .run(function(error, featureCollection){
            formatLeadDates(featureCollection.features[0].properties.valid_seas);
            $('#lead-options option[value="temp-lead-13"]').text(leadLabel);
            lead13Label = leadLabel;
        });

        var validmonth;
        var validMonthEnd;
        var releasemonth;
        var valid_seas;
        var currentLayerName = "temp610dayLayer";

        var currentLayer = temp610dayLayer;

        currentLayer.on('load', iterateFeatures);
        //hide Select a Lead
        $('#lead-selector').hide();

        function iterateFeatures() {
          currentLayer.eachFeature(function(layer) {

            layer.setStyle({
              fillOpacity: 0.6
            });

            // validmonth = layer.feature.properties.start_date;
            // releasemonth = layer.feature.properties.fcst_date;
            // validmonth = new Date(layer.feature.properties.start_date);
            // validMonthEnd = new Date(layer.feature.properties.end_date);
            // releasemonth = new Date(layer.feature.properties.fcst_date);
            //validSeason = layer.feature.properties.valid_seas;
            // var validMonthFormat = (validmonth.getMonth() + 1) + '-' +  validmonth.getDate()   + '-' + validmonth.getFullYear();
            // var validMonthEndFormat = (validMonthEnd.getMonth() + 1) + '-' +  validMonthEnd.getDate()   + '-' + validMonthEnd.getFullYear();
            // var releaseMonthFormat = (releasemonth.getMonth() + 1) + '-' +  releasemonth.getDate()   + '-' + releasemonth.getFullYear();
            // validmonth = validMonthFormat + ' - ' + validMonthEndFormat;
            // releasemonth = releaseMonthFormat;

            //create new Date object
            validmonth = new Date(layer.feature.properties.start_date);
            validmonth = validmonth.setDate(validmonth.getDate() + 1);
            validmonth = new Date(validmonth);
            validMonthEnd = new Date(layer.feature.properties.end_date);
            validMonthEnd = validMonthEnd.setDate(validMonthEnd.getDate() + 1);
            validMonthEnd = new Date(validMonthEnd);
            releasemonth = new Date(layer.feature.properties.fcst_date);
            releasemonth = releasemonth.setDate(releasemonth.getDate() + 1);
            releasemonth = new Date(releasemonth);

            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            //format dates
            validmonth = validmonth.toLocaleDateString("en-US", options);
            validMonthEnd = validMonthEnd.toLocaleDateString("en-US", options);
            validmonth = validmonth + ' - ' + validMonthEnd;
            releasemonth = releasemonth.toLocaleDateString("en-US", options);

            if (currentLayerName === "temp610dayLayer") {
              $('#temp-map-header .valid-dates').html("Valid: " + validmonth + "<br> Released: " + releasemonth);
            }
            else if (currentLayerName === "temp814dayLayer"){
              $('#temp-map-header .valid-dates').html("Valid: " + validmonth + "<br> Released: " + releasemonth);
            }
            else if (currentLayerName === "tempMonthlyLayer"){
              $('#temp-map-header .valid-dates').html("Valid: " + layer.feature.properties.valid_seas + "<br> Released: " + releasemonth);
            }


            // if (layer.feature.properties.valid_seas){
            //   formatLeadDates(layer.feature.properties.valid_seas);
            // }

            if (layer.feature.properties.cat === "Above") {
              // get probability of the layer
              switch(layer.feature.properties.prob) {
                case 90:
                  layer.bindTooltip("90% - 100% chance of Above Average Temperature");
                  break;
                case 80:
                  layer.bindTooltip("80% - 90% chance of Above Average Temperature");
                  break;
                case 70:
                  layer.bindTooltip("70% - 80% chance of Above Average Temperature");
                  break;
                case 60:
                    layer.bindTooltip("60% - 70% chance of Above Average Temperature");
                    break;
                case 50:
                    layer.bindTooltip("50% - 60% chance of Above Average Temperature");
                    break;
                case 40:
                  layer.bindTooltip("40% - 50% chance of Above Average Temperature");
                  break;
                case 33:
                  layer.bindTooltip("33% chance of Above Average Temperature");
                  break;
              }
            } else if (layer.feature.properties.cat === "Normal") {
              layer.bindTooltip("36% chance of Normal Temperature");
            } else if (layer.feature.properties.cat === "EC") {
                  //layer.removeFrom(tempmap);
                  //layer.bindTooltip("EC");
            } else if (layer.feature.properties.cat === "Below") {
              switch(layer.feature.properties.prob) {
                case 33:
                  layer.bindTooltip("33% chance of Below Average Temperature");
                  break;
                case 40:
                  layer.bindTooltip("40% - 50% chance of Below Average Temperature");
                  break;
                case 50:
                  layer.bindTooltip("50% - 60% chance of Below Average Temperature");
                  break;
                case 60:
                  layer.bindTooltip("60% - 70% chance of Below Average Temperature");
                  break;
                case 70:
                  layer.bindTooltip("70% - 80% chance of Below Average Temperature");
                  break;
                case 80:
                  layer.bindTooltip("80% - 90$ chance of Below Average Temperature");
                  break;
                case 90:
                  layer.bindTooltip("90% - 100% chance of Below Average Temperature");
                  break;
              }
            }
          });

          //repopulate the pie chart
          if (region === "AK") {
            getTempHandlerAlaska(coord);
          } else {
            getTempHandler(coord);
          }

        }

        temp610dayLayer.query()
          .run(function(error, featureCollection){

            //create new Date object
            validmonth = new Date(featureCollection.features[0].properties.start_date);
            validmonth = validmonth.setDate(validmonth.getDate() + 1);
            validmonth = new Date(validmonth);
            validMonthEnd = new Date(featureCollection.features[0].properties.end_date);
            validMonthEnd = validMonthEnd.setDate(validMonthEnd.getDate() + 1);
            validMonthEnd = new Date(validMonthEnd);
            releasemonth = new Date(featureCollection.features[0].properties.fcst_date);
            releasemonth = releasemonth.setDate(releasemonth.getDate() + 1);
            releasemonth = new Date(releasemonth);

            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            //format dates
            validmonth = validmonth.toLocaleDateString("en-US", options);
            validMonthEnd = validMonthEnd.toLocaleDateString("en-US", options);
            validmonth = validmonth + ' - ' + validMonthEnd;
            releasemonth = releasemonth.toLocaleDateString("en-US", options);


            // Set initial title and valid period for 6-10 day temperature outlook
            $('#temp-map-header .title').text("U.S. 6 to 10 Day Temperature Outlook");
            $('#temp-map-header .valid-dates').html("Valid: " + validmonth + "<br> Released: " + releasemonth);

            marker.bindPopup(function (layer){
              return L.Util.template("Collge Park, MD <br> <a href= https://forecast.weather.gov/MapClick.php?lat=38.98970" +
              "&amp;lon=-76.93776 " +
              "target=_blank title='Link to 7 Day Forecast'>7 Day Forecast for College Park, MD");
            }).openPopup();

        });
        var temp610dayChecked = $('#temp-map__view-select input[type=radio][id=temp610day]:checked');
        var temp814dayChecked = $('#temp-map__view-select input[type=radio][id=temp814day]:checked');

        if (temp610dayChecked) {
          $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/610day/610temp.new.gif');
        }
        else if (temp814dayChecked) {
          $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/814day/814temp.new.gif');
        }

        //change the layers of the map to Monthly or temp based on the dropdown list
        $('input[name=temp-map-duration]').on('change', function() {
          if (this.value == 'temp610day') {
            removePrevLayer();
            currentLayer = temp610dayLayer;
            currentLayerName = "temp610dayLayer";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
            //hide Select a Lead
            $('#lead-selector').hide();
            $('#temp-map-header .title').text("U.S. 6 to 10 Day Temperature Outlook");
            //$('#temp-map-header .valid-dates').html("Valid: " + validmonth + "<br> Released: " + releasemonth);
            $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/610day/610temp.new.gif');
          }
          else if (this.value == 'temp814day') {
            removePrevLayer();
            currentLayer = temp814dayLayer;
            currentLayerName = "temp814dayLayer";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);

            //hide Select a Lead
            $('#lead-selector').hide();
            $('#temp-map-header .title').text("U.S. 8 to 14 Day Temperature Outlook");
            //$('#temp-map-header .valid-dates').html("Valid: " + validmonth + "<br> Released: " + releasemonth);
            $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/814day/814temp.new.gif');
          }
          else if (this.value == 'tempmonthly') {
            removePrevLayer();
            currentLayer = tempMonthlyLayer;
            currentLayerName = "tempMonthlyLayer";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
            //hide Select a Lead
            $('#lead-selector').hide();
            $('#temp-map-header .title').text("U.S. Monthly Temperature Outlook");
            //$('#temp-map-header .valid-dates').html("Valid: " + monthlyValidDate + "<br> Released: " + releasemonth);
            $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead14/off14_temp.gif');
          }
          else if (this.value == 'temp3month') {
            removePrevLayer();
            currentLayer = temp3MonthLead1Layer;
            currentLayerName = "Lead1";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
            //Show Select a Lead
            $('#lead-selector').show();
            $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
            $('#temp-map-header .valid-dates').html("Valid: " + lead1Label + "<br> Released: " + releasemonth);
            $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead01/off01_temp.gif');
          }
        });

        // Function to remove any existing layers
        function removePrevLayer() {
          if (tempmap.hasLayer(currentLayer)) {
            tempmap.removeLayer(currentLayer);
          }
        };

        //change the map to the correct area
        $('input[type=radio][name=temp-map-view]').on('change',function() {
          if (this.value == 'conus') {
            tempmap.setView(new L.LatLng(38, -96), 3.9)
            //set default marker back to College Park, MD
            if (marker) {
              tempmap.removeLayer(marker);
            }
            //add marker to map at click location
            var init_coord = L.latLng(38.98970, -76.93776);

            //var marker;
            //add initial marker
            marker = new L.marker(init_coord).addTo(tempmap);
            marker.bindPopup(function (layer){
              return L.Util.template("Collge Park, MD <br> <a href= https://forecast.weather.gov/MapClick.php?lat=38.98970" +
              "&amp;lon=-76.93776 " +
              "target=_blank title='Link to 7 Day Forecast'>7 Day Forecast for College Park, MD");
            }).openPopup();
            
            
  
            var latitude = 38.989697;
            var longitude = -76.937759;
            var coord = latitude.toFixed(2) + ", " + longitude.toFixed(2);
  
            //locate the closest town/city within 160 miles
            //getForecast(e.Latlng = 64.2,-149.2);
            
            //reset the variables before loading new data, prevents old data from being displayed if the pie chart loads before the new data refreshes
            mint_norm = null;
            maxt_norm = null;
            temp_abv = null;
            temp_blo =  null;
            temp_norm = null;
            
            getTempHandler(coord);
          }

          else if (this.value == 'alaska') {
            tempmap.setView(new L.LatLng(64.2,-149.4), 3.9)
            //set default marker for Anchorage, Alaska
            if (marker) {
              tempmap.removeLayer(marker);
            }
            //add marker to map at click location
            var init_coord = L.latLng(61.217381, -149.863129);

            //var marker;
            //add initial marker
            marker = new L.marker(init_coord).addTo(tempmap);
            marker.bindPopup(function (layer){
              return L.Util.template("Anchorage, AK <br> <a href= https://forecast.weather.gov/MapClick.php?lat=61.217381" +
              "&amp;lon=-149.863129 " +
              "target=_blank title='Link to 7 Day Forecast'>7 Day Forecast for Anchorage, AK");
            }).openPopup();
            
            
  
            var latitude = 61.217381;
            var longitude = -149.863129;
            coord = latitude.toFixed(2) + ", " + longitude.toFixed(2);
  
            //locate the closest town/city within 160 miles
            //getForecast(e.Latlng = 64.2,-149.2);
            
            //reset the variables before loading new data, prevents old data from being displayed if the pie chart loads before the new data refreshes
            mint_norm = null;
            maxt_norm = null;
            temp_abv = null;
            temp_blo =  null;
            temp_norm = null;
            
            getTempHandlerAlaska(coord);
           
          }
        });


        var tempSlider = $('#temp-opacity-level')[0];
        // var output = document.getElementById("sliderValue");
        var tempOutput = $('.temp-opacity-slider__value')[0];

        var opacityVal = $('.temp-opacity-slider__range').val();
        // Convert opacity decimal value to percent
        var percent = Math.round(tempSlider.value * 100);

        // Write percent value in html label area
        $('.temp-opacity-slider__value').html(percent);

        tempOutput.innerHTML = percent;
        tempSlider.oninput = function() {
          tempOutput.innerHTML = Math.round(this.value * 100);

          currentLayer.eachFeature(function(layer){
            layer.setStyle({
              fillOpacity: (tempSlider.value)
            });
          });
        }

        $('[name=lead-options]').on('change', function() {
          if (this.value == 'temp-lead-1') {
            removePrevLayer();
            currentLayer = temp3MonthLead1Layer;
            currentLayerName = "Lead1";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead1Label + "<br> Released: " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead01/off01_temp.gif');
          }
          else if (this.value == 'temp-lead-2') {
            removePrevLayer();
            currentLayer = temp3MonthLead2Layer;
            currentLayerName = "Lead2";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead2Label + "<br> Released: " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead02/off02_temp.gif');
          }
          else if (this.value == 'temp-lead-3') {
            removePrevLayer();
            currentLayer = temp3MonthLead3Layer;
            currentLayerName = "Lead3";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead3Label + "<br> Released: " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead03/off03_temp.gif');
          }
          else if (this.value == 'temp-lead-4') {
            removePrevLayer();
            currentLayer = temp3MonthLead4Layer;
            currentLayerName = "Lead4";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead4Label + "<br> Released: " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead04/off04_temp.gif');
          }
          else if (this.value == 'temp-lead-5') {
            removePrevLayer();
            currentLayer = temp3MonthLead5Layer;
            currentLayerName = "Lead5";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead5Label + "<br> Released: " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead05/off05_temp.gif');
          }
          else if (this.value == 'temp-lead-6') {
            removePrevLayer();
            currentLayer = temp3MonthLead6Layer;
            currentLayerName = "Lead6";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead6Label + "<br> Released: " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead06/off06_temp.gif');
          }
          else if (this.value == 'temp-lead-7') {
            removePrevLayer();
            currentLayer = temp3MonthLead7Layer;
            currentLayerName = "Lead7";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead7Label + "<br> Released: " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead07/off07_temp.gif');
          }
          else if (this.value == 'temp-lead-8') {
            removePrevLayer();
            currentLayer = temp3MonthLead8Layer;
            currentLayerName = "Lead8";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead8Label + "<br> Released: " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead08/off08_temp.gif');
          }
          else if (this.value == 'temp-lead-9') {
            removePrevLayer();
            currentLayer = temp3MonthLead9Layer;
            currentLayerName = "Lead9";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead9Label + "<br> Released: " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'temp-lead-10') {
            removePrevLayer();
            currentLayer = temp3MonthLead10Layer;
            currentLayerName = "Lead10";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead10Label + "<br> Released: " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'temp-lead-11') {
            removePrevLayer();
            currentLayer = temp3MonthLead11Layer;
            currentLayerName = "Lead11";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead11Label + "<br> Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'temp-lead-12') {
            removePrevLayer();
            currentLayer = temp3MonthLead12Layer;
            currentLayerName = "Lead12";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead12Label + "<br> Released: " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'temp-lead-13') {
            removePrevLayer();
            currentLayer = temp3MonthLead13Layer;
            currentLayerName = "Lead13";
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
           $('#temp-map-header .valid-dates').html("Valid: " + lead13Label + "<br> Released: " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
        });

        var mint_norm;
        var maxt_norm;
        var temp_abv;
        var temp_blo;
        var temp_norm;
        var coord;
        var region;

        //init table load
		    var init_coord = L.latLng(38.98970, -76.93776);

        var marker;
        //add initial marker
        marker = new L.marker(init_coord).addTo(tempmap);
        

        // document.getElementById('location-container').innerHTML =
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
        tempmap.on('load', getTempHandler(coord));
        var chartTemp;
        var options = {
          colors:['#d35656','#5c94bd','#b2e4d5'],
          //b22222
          pieSliceText: 'percentage',
          pieSliceTextStyle: {color: 'black', fontSize: 12},
          is3D:'true',
          tooltip: {text: 'percentage'},
          title:'Three Category Temperature Outlook',
          width:400,
          height:300
        };

        function drawChartInitial(mint_norm,maxt_norm,temp_abv,temp_blo,temp_norm) {

          // Create the data table.
          var data = google.visualization.arrayToDataTable([
            ['Category', 'Count'],
            ['Above Normal', eval(temp_abv)],
            ['Below Normal', eval(temp_blo)],
            ['Near Normal', eval(temp_norm)]
          ]);

        	if (maxt_norm > -200) {
        		document.getElementById("chart_div_temp_label_max").innerHTML=
                "<font color=black>Three Category Temperature Outlook<br>Normal Maximum Temperature: </font><b>"
                + maxt_norm + "</b></a>";
      		}
          else {
        		document.getElementById("chart_div_temp_label_max").innerHTML=
              "<font color=black>Three Category Temperature Outlook<br>Normal Maximum Temperature: N/A</font></a>";
        	}

          if (mint_norm > -200) {
        		document.getElementById("chart_div_temp_label_min").innerHTML=
              "<font color=black>Normal Minimum Temperature: </font><b>"
              + mint_norm + "</b></a>";
        	}
          else {
      		document.getElementById("chart_div_temp_label_min").innerHTML="<font color=black>Normal Minimum Temperature: N/A</font></a>";
      		}


          // Instantiate and draw our chart, passing in some options.
          chartTemp = new google.visualization.PieChart(document.getElementById('temp-chart'));
          chartTemp.draw(data, options);
          initialLoad = false;
        }

        tempmap.on('click', addMarker);

        function addMarker(e){
          if (marker) {
            tempmap.removeLayer(marker);
          }
          //add marker to map at click location
          marker = new L.marker(e.latlng).addTo(tempmap);

          var latitude = e.latlng.lat;
          var longitude = e.latlng.lng;
          coord = latitude.toFixed(2) + ", " + longitude.toFixed(2);

          //locate the closest town/city within 160 miles
          getForecast(e);
          //create tables onClick
          //reset the variables before loading new data, prevents old data from being displayed if the pie chart loads before the new data refreshes
          mint_norm = null;
          maxt_norm = null;
          temp_abv = null;
          temp_blo =  null;
          temp_norm = null;
          if (region == "AK"){
            getTempHandlerAlaska(coord);
          }
          else
          {
            getTempHandler(coord);
          }

        }

        function getForecast(e){
          //build query parameters
          var latitude = e.latlng.lat;
          var longitude = e.latlng.lng;

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
            // document.getElementById('location-container').innerHTML =
            //     "<a href= https://forecast.weather.gov/MapClick.php?lat=" +
            //     latitude.toFixed(2)+"&amp;lon="+ longitude.toFixed(2) +
            //     " target=_blank title='Link to 7 Day Forecast'>7 Day Forecast for " +
            //     featureCollection.features[0].properties.PO_NAME + ", "+ featureCollection.features[0].properties.STATE+"</a>";
            //     region = featureCollection.features[0].properties.STATE;
            marker.bindPopup(function (layer){
              region = featureCollection.features[0].properties.STATE;
              return L.Util.template(featureCollection.features[0].properties.PO_NAME + ", " + featureCollection.features[0].properties.STATE + 
              "<br><a href= https://forecast.weather.gov/MapClick.php?lat=" +
                  latitude.toFixed(2)+"&amp;lon="+ longitude.toFixed(2) +
                  " target=_blank title='Link to 7 Day Forecast'>7 Day Forecast for " +
                  featureCollection.features[0].properties.PO_NAME + ", "+ featureCollection.features[0].properties.STATE+"</a>");                  
            }).openPopup();
            
              
          })
        }

      function getTempHandler(coord) {
    		var xmlHttp = getXMLHttp();
    		xmlHttp.onreadystatechange = function() {
    			//console.log(xmlHttp.readyState);
    			if (xmlHttp.readyState==4 && xmlHttp.status==200) {
    				HandleResponse_Temp(xmlHttp.responseText);
          }
        }

        //get the correct data based on which layer is selected (including Leads)
        if (currentLayerName == "temp610dayLayer") {
          xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/610day/interactive/includes/get_temps_pie.php?coord="+coord+"&region=conus", true);
        } else if (currentLayerName == "temp814dayLayer") {
          xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/814day/interactive/includes/get_temps_pie.php?coord="+coord+"&region=conus", true);
        } else if (currentLayerName == "tempMonthlyLayer"){
          xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead14/interactive/includes/get_temps_pie.php?coord="+coord+"&region=conus", true);
        } else {
          xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/long_range/interactive/includes/get_temps_pie.php?coord="+coord+"&region=conus&lead="+ currentLayerName, true);
          console.log(currentLayerName);
        }
    		xmlHttp.send(null);
      }

<<<<<<< HEAD
      function getTempHandlerAlaska(coord) {
    		var xmlHttp = getXMLHttp();
=======

     function getTempHandlerAlaska(coord) {
        var xmlHttp = getXMLHttp();
>>>>>>> pie chart was not updated when first selected Alaska radio button
    		xmlHttp.onreadystatechange = function() {
    			//console.log(xmlHttp.readyState);
    			if (xmlHttp.readyState==4 && xmlHttp.status==200) {
    				HandleResponse_Temp(xmlHttp.responseText);
          }
        }

        //xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/610day/interactive/includes/get_temps_pie.php?coord="+coord+"&region=alaska", true);

        // Get the correct data based on which layer is selected (including Leads)
        if (currentLayerName == "temp610dayLayer") {
          xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/610day/interactive/includes/get_temps_pie.php?coord="+coord+"&region=alaska", true);
        }
        else if (currentLayerName == "temp814dayLayer") {
          xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/814day/interactive/includes/get_temps_pie.php?coord="+coord+"&region=alaska", true);
        }
        else if (currentLayerName == "tempMonthlyLayer"){
          xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead14/interactive/includes/get_temps_pie.php?coord="+coord+"&region=alaska", true);
        }
        else {
          xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/long_range/interactive/includes/get_temps_pie.php?coord="+coord+"&region=alaska&lead="+ currentLayerName, true);
        }
        xmlHttp.send(null);
      }


      function HandleResponse_Temp(response) {
        response = response.split('#');
        mint_norm = response[0];
        maxt_norm = response[1];
        temp_abv = response[2];
        temp_blo =  response[3];
        temp_norm = response[4];
        if (initialLoad) {
          if (temp_norm === null) {
            drawChartInitial(mint_norm,maxt_norm,temp_abv,temp_blo,temp_norm);
          } else {
            setTimeout(function() {
              drawChartInitial(mint_norm,maxt_norm,temp_abv,temp_blo,temp_norm);
            }, 700);
          }
        } else {
          if (temp_norm === null) {
            drawChart(mint_norm,maxt_norm,temp_abv,temp_blo,temp_norm);
          } else {
            setTimeout(function() {
              drawChart(mint_norm,maxt_norm,temp_abv,temp_blo,temp_norm);
            }, 700);
          }
        }
      }


      function drawChart(mint_norm,maxt_norm,temp_abv,temp_blo,temp_norm) {
        // Map data to legend
        var data = google.visualization.arrayToDataTable([
          ['Category', 'Count'],
          ['Above Normal', eval(temp_abv)],
          ['Below Normal', eval(temp_blo)],
          ['Near Normal', eval(temp_norm)]
        ]);

        if (maxt_norm > -200) {
          document.getElementById("chart_div_temp_label_max").innerHTML=
              "<font color=black>Three Category Temperature Outlook<br>Normal Maximum Temperature: </font><strong>"
              + maxt_norm + "</strong></a>";
        } else {
          document.getElementById("chart_div_temp_label_max").innerHTML=
            "<font color=black>Three Category Temperature Outlook<br>Normal Maximum Temperature: N/A</font></a>";
        }

<<<<<<< HEAD
        if (mint_norm > -200) {
          document.getElementById("chart_div_temp_label_min").innerHTML=
            "<font color=black>Normal Minimum Temperature: </font><strong>"
            + mint_norm + "</strong></a>";
        } else {
            document.getElementById("chart_div_temp_label_min").innerHTML="<font color=black>Normal Minimum Temperature: N/A</font></a>";
=======
          chartTemp = new google.visualization.PieChart(document.getElementById('temp-chart')); 
          chartTemp.draw(data, options);
>>>>>>> pie chart was not updated when first selected Alaska radio button
        }
        chartTemp = new google.visualization.PieChart(document.getElementById('temp-chart'));
        chartTemp.draw(data, options);
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

      tempmap.invalidateSize();

    //  }); // .once
  //  } // attach
  //}; // behaviors

})(jQuery);
