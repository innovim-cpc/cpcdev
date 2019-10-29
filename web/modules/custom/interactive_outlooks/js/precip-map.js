/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
  "use strict";

   //Drupal.behaviors.createprecipMap = {
   	//attach:function (context, settings) {

   	  //$('#precip-outlooks-map', context).once('#precip-map', function() {

  		  // Create the map
        var precipmap = L.map('precip-map', {
          center: [38, -96],
          zoomSnap: 0.1,
          zoom: 3.9,
          minZoom: 3.9
        });

        // Add Esri World Topo base map via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(precipmap);


        // Get link to layer data
        // const temp = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/0/";
        // const precip = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/1/";

        //create Precipitation layers
        var precip610dayLayer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/1'
        });
        var precip814dayLayer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_8_14_day_outlk/MapServer/1'
        });
        var precipMonthlyLayer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_mthly_precip_outlk/MapServer/0'
        });
        var precip3MonthLead1Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/0'
        });
        var precip3MonthLead2Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/1'
        });
        var precip3MonthLead3Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/2'
        });
        var precip3MonthLead4Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/3'
        });
        var precip3MonthLead5Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/4'
        });
        var precip3MonthLead6Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/5'
        });
        var precip3MonthLead7Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/6'
        });
        var precip3MonthLead8Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/7'
        });
        var precip3MonthLead9Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/8'
        });
        var precip3MonthLead10Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/9'
        });
        var precip3MonthLead11Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/10'
        });
        var precip3MonthLead12Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/11'
        });
        var precip3MonthLead13Layer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_precip_outlk/MapServer/12'
        });

        //search by address
        // create the geocoding control and add it to the map
       var searchControl = L.esri.Geocoding.geosearch().addTo(precipmap);

       // create an empty layer group to store the results and add it to the map
       var results = L.layerGroup().addTo(precipmap);

       // listen for the results event and add every result to the map
       searchControl.on("results", function(data) {
           results.clearLayers();
           for (var i = data.results.length - 1; i >= 0; i--) {
               addMarker(data.results[i]);
           }
       });

        //Add initial layer to map
        precip610dayLayer.addTo(precipmap);


        var currentLayer = precip610dayLayer;
        var previousLayer = "";
        currentLayer.on('load', iterateFeatures);

        var validmonth = "";
        var releasemonth = "";
        $('#precip-map-header .precip-title').text("U.S. 6 to 10 Day Precipitation Outlook");
        $('#precip-map-header .precip-valid-dates').text("Valid for " + new Date(validmonth) + ", Released " + new Date(releasemonth));
        $('#lead-selector-precip').hide();

        function iterateFeatures () {
          currentLayer.eachFeature(function(layer) {
            layer.setStyle({
               fillOpacity: 0.6
            });

            if (layer.feature.properties.cat == "Above"){

              //get probability of the layer
              switch(layer.feature.properties.prob){
                case 90:
                  layer.bindTooltip("90% chance of Above Average Precipitation");
                  break;
                case 80:
                  layer.bindTooltip("80% chance of Above Average Precipitation");
                  break;
                case 70:
                  layer.bindTooltip("70% chance of Above Average Precipitation");
                  break;
                case 60:
                    layer.bindTooltip("60% chance of Above Average Precipitation");
                    break;
                case 50:
                    layer.bindTooltip("50% chance of Above Average Precipitation");
                    break;
                case 40:
                  layer.bindTooltip("40% chance of Above Average Precipitation");
                  break;
                case 33:
                  layer.bindTooltip("33% chance of Above Average Precipitation");
                  break;
              }

            }
            else if (layer.feature.properties.cat == "Normal"){
                  layer.bindTooltip("36% chance of Normal Precipitation");
            }
            else if (layer.feature.properties.cat == "EC"){
                  layer.removeFrom(precipmap);
            }
            else if (layer.feature.properties.cat == "Below"){
              switch(layer.feature.properties.prob){
                case 33:
                  layer.bindTooltip("33% chance of Below Average Precipitation");
                  break;
                case 40:
                  layer.bindTooltip("40% chance of Below Average Precipitation");
                  break;
                case 50:
                  layer.bindTooltip("50% chance of Below Average Precipitation");
                  break;
                case 60:
                  layer.bindTooltip("60% chance of Below Average Precipitation");
                  break;
                case 70:
                  layer.bindTooltip("70% chance of Below Average Precipitation");
                  break;
                case 80:
                  layer.bindTooltip("80% chance of Below Average Precipitation");
                  break;
                case 90:
                  layer.bindTooltip("90% chance of Below Average Precipitation");
                  break;
              }
            }
          });
        }

        precip610dayLayer.query()
          .run(function(error, featureCollection){
          validmonth = featureCollection.features[0].properties.start_date;
          releasemonth = featureCollection.features[0].properties.fcst_date;

          // Set initial title and valid period for monthly drought outlook
          $('#precip-map-header .title').text("U.S. 6 to 10 Day Precipitation Outlook");
          $('#precip-map-header .valid-dates').text("Valid for " + new Date(validmonth) + ", Released " + new Date(releasemonth));
        });


        var precip610dayChecked = $('#precip-map__view-select input[type=radio][id=precip610day]:checked');
        var precip814dayChecked = $('#precip-map__view-select input[type=radio][id=precip610day]:checked');

        if (precip610dayChecked) {
          $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
        } else if (precip814dayChecked) {
          $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/season_drought.png');
        }

        //change the layers of the map to Monthly or precip based on the dropdown list
        $('input[name=precip-map-duration]').on('change', function() {
          if (this.value == 'precip610day') {
            removePrevLayer();
            currentLayer = precip610dayLayer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
            //hide Select a Lead
            $('#lead-selector-precip').hide();
            $('#precip-map-header .precip-title').text("U.S. 6 to 10 Day Precipitation Outlook");
            $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
            $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/610day/610prcp.new.gif');
          }
          else if (this.value == 'precip814day') {
            removePrevLayer();
            currentLayer = precip814dayLayer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
            //hide Select a Lead
            $('#lead-selector-precip').hide();
            $('#precip-map-header .precip-title').text("U.S. 8 to 14 Day Precipitation Outlook");
            $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
            $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/814day/814prcp.new.gif');
          }
          else if (this.value == 'precip-monthly') {
            removePrevLayer();
            currentLayer = precipMonthlyLayer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);

            //hide Select a Lead
            $('#lead-selector-precip').hide();
            $('#precip-map-header .title').text("U.S. Monthly Precipitation Outlook");
            $('#precip-map-header .valid-dates').text("Valid for " + new Date(validmonth) + ", Released " + new Date(releasemonth));
            $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead14/off14_prcp.gif');
          }
          else if (this.value == 'precip-3month') {
            removePrevLayer();
            currentLayer = precip3MonthLead1Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
            //Show Select a Lead
            $('#lead-selector-precip').show();
            $('#precip-map-header .title').text("U.S. 3 Month Preciptation Outlook");
            $('#precip-map-header .valid-dates').text("Valid for " + new Date(validmonth) + ", Released " + new Date(releasemonth));
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
            precipmap.setView(new L.LatLng(38, -96), 3.9)
          }
          else if (this.value == 'alaska') {
            precipmap.setView(new L.LatLng(64.2,-149.4), 3.9)
          }
        });

        var precipSlider = $('#precip-opacity-level')[0];
        // var output = document.getElementById("sliderValue");
        var precipOutput = $('.precip-opacity-slider__value')[0];

        var opacityVal = $('.precip-opacity-slider__range').val();
        // Convert opacity decimal value to percent
        var percent = Math.round(opacityVal * 100);
        // Write percent value in html label area
        $('.precip-opacity-slider__value').html(percent);

        precipOutput.innerHTML = precipSlider.value;
        precipSlider.oninput = function() {
          precipOutput.innerHTML = this.value;

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
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 1");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip-lead-2') {
            removePrevLayer();
            currentLayer = precip3MonthLead2Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 2");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip-lead-3') {
            removePrevLayer();
            currentLayer = precip3MonthLead3Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 3");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip-lead-4') {
            removePrevLayer();
            currentLayer = precip3MonthLead4Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 4");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip-lead-5') {
            removePrevLayer();
            currentLayer = precip3MonthLead5Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 5");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip-lead-6') {
            removePrevLayer();
            currentLayer = precip3MonthLead6Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 6");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip-lead-7') {
            removePrevLayer();
            currentLayer = precip3MonthLead7Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 7");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip-lead-8') {
            removePrevLayer();
            currentLayer = precip3MonthLead8Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 8");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip-lead-9') {
            removePrevLayer();
            currentLayer = precip3MonthLead9Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 9");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip-lead-10') {
            removePrevLayer();
            currentLayer = precip3MonthLead10Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 10");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip-lead-11') {
            removePrevLayer();
            currentLayer = precip3MonthLead11Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 11");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip-lead-12') {
            removePrevLayer();
            currentLayer = precip3MonthLead12Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 12");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip-lead-13') {
            removePrevLayer();
            currentLayer = precip3MonthLead13Layer;
            currentLayer.addTo(precipmap);
            currentLayer.on('load', iterateFeatures);
           $('#precip-map-header .precip-title').text("U.S. 3 Month Precipitation Outlook - Lead 13");
           $('#precip-map-header .precip-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.precip-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
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

        document.getElementById('location-container-precip').innerHTML =
            "<a href= https://forecast.weather.gov/MapClick.php?lat=38.98970" +
            "&amp;lon=-76.93776 " +
            "target=_blank title='Link to 7 Day Forecast'>7 Day Forecast for College Park, MD"

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
            document.getElementById('location-container-precip').innerHTML =
                "<a href= https://forecast.weather.gov/MapClick.php?lat=" +
                latitude.toFixed(2)+"&amp;lon="+ longitude.toFixed(2) +
                " target=_blank title='Link to 7 Day Forecast'>7 Day Forecast for " +
                featureCollection.features[0].properties.PO_NAME + ", "+ featureCollection.features[0].properties.STATE+"</a>";
                region = featureCollection.features[0].properties.STATE;
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
    			xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/610day/interactive/includes/get_precip_pie.php?coord="+coord+"&region=conus", true);
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
    			xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/610day/interactive/includes/get_precip_pie.php?coord="+coord+"&region=alaska", true);
    			xmlHttp.send(null);
      }
      function HandleResponse_Precip(response) {
      		response = response.split('#');
          pcpn_norm = response[0];
    			precip_abv = response[1];
    			precip_blo = response[2];
    			precip_norm = response[3];
            if (initialLoad){
              if (pcpn_norm == null)
              {
                drawChartInitial(pcpn_norm,precip_abv,precip_blo,precip_norm);
              }
              else
              {
                setTimeout(function(){
                    drawChartInitial(pcpn_norm,precip_abv,precip_blo,precip_norm);
                }, 700);
              }
            }
            else
            {
              if (pcpn_norm == null)
              {
                drawChart(pcpn_norm,precip_abv,precip_blo,precip_norm);
              }
              else
              {
                setTimeout(function(){
                    drawChart(pcpn_norm,precip_abv,precip_blo,precip_norm);
                }, 700);
              }
            }
        }

      function drawChart(pcpn_norm,precip_abv,precip_blo,precip_norm) {

          // Create the data table.
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
      		}
          else {
        		document.getElementById("chart-div-precip-label").innerHTML=
              "<font color=black>Three Category Precipitation Outlook<br>Normal Precipitation: N/A</font></a>";
        	}
          chartPrecip = new google.visualization.PieChart(document.getElementById('precip-chart'));
          chartPrecip.draw(data, options);
        }

      function getXMLHttp() {
  		var xmlHttp;
  		try {
  		//Firefox, Opera 8.0+, Safari
  		xmlHttp = new XMLHttpRequest();
  		}
      catch(e) {
  		//Internet Explorer
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





    //  }); // .once
  //  } // attach
  //}; // behaviors

})(jQuery);