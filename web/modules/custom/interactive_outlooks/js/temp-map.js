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

        // Get link to layer data
        const temp610day = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/0/";


        // another feature layer with unique value renderer defined in the service
        var temp610dayLayer = L.esri.featureLayer({
          url:'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/0'
        }).addTo(tempmap);
        var temp814dayLayer = L.esri.featureLayer({
          url:'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_8_14_day_outlk/MapServer/0'
        });
        var tempMonthlyLayer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_mthly_temp_outlk/MapServer/0'
        });
        var temp3MonthLead1Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/0'
        });
        var temp3MonthLead2Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/1'
        });
        var temp3MonthLead3Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/2'
        });
        var temp3MonthLead4Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/3'
        });
        var temp3MonthLead5Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/4'
        });
        var temp3MonthLead6Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/5'
        });
        var temp3MonthLead7Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/6'
        });
        var temp3MonthLead8Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/7'
        });
        var temp3MonthLead9Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/8'
        });
        var temp3MonthLead10Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/9'
        });
        var temp3MonthLead11Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/10'
        });
        var temp3MonthLead12Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/11'
        });
        var temp3MonthLead13Layer = L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_sea_temp_outlk/MapServer/12'
        });

        //search by address
        // create the geocoding control and add it to the map
       var searchControl = L.esri.Geocoding.geosearch().addTo(tempmap);

       // create an empty layer group to store the results and add it to the map
       var results = L.layerGroup().addTo(tempmap);

       // listen for the results event and add every result to the map
       searchControl.on("results", function(data) {
           results.clearLayers();
           for (var i = data.results.length - 1; i >= 0; i--) {
               addMarker(data.results[i]);
           }
       });

        var validmonth = "";
        var releasemonth = "";

        var currentLayer = temp610dayLayer;
        var previousLayer = "";
        currentLayer.on('load', iterateFeatures);
        //hide Select a Lead
        $('#lead-selector').hide();

        function iterateFeatures () {
          currentLayer.eachFeature(function(layer) {
            validmonth = layer.feature.properties.start_date;
            releasemonth = layer.feature.properties.fcst_date;
            layer.setStyle({
               fillOpacity: 0.6
            });
            if (layer.feature.properties.cat == "Above"){

              //get probability of the layer
              switch(layer.feature.properties.prob){
                case 90:
                  layer.bindTooltip("90% chance of Above Average Temperature");
                  break;
                case 80:
                  layer.bindTooltip("80% chance of Above Average Temperature");
                  break;
                case 70:
                  layer.bindTooltip("70% chance of Above Average Temperature");
                  break;
                case 60:
                    layer.bindTooltip("60% chance of Above Average Temperature");
                    break;
                case 50:
                    layer.bindTooltip("50% chance of Above Average Temperature");
                    break;
                case 40:
                  layer.bindTooltip("40% chance of Above Average Temperature");
                  break;
                case 33:
                  layer.bindTooltip("33% chance of Above Average Temperature");
                  break;
              }

            }
            else if (layer.feature.properties.cat == "Normal"){
                  layer.bindTooltip("36% chance of Normal Temperature");
            }
            else if (layer.feature.properties.cat == "EC"){
                  layer.removeFrom(tempmap);

            }
            else if (layer.feature.properties.cat == "Below"){
              switch(layer.feature.properties.prob){
                case 33:
                  layer.bindTooltip("33% chance of Below Average Temperature");
                  break;
                case 40:
                  layer.bindTooltip("40% chance of Below Average Temperature");
                  break;
                case 50:
                  layer.bindTooltip("50% chance of Below Average Temperature");
                  break;
                case 60:
                  layer.bindTooltip("60% chance of Below Average Temperature");
                  break;
                case 70:
                  layer.bindTooltip("70% chance of Below Average Temperature");
                  break;
                case 80:
                  layer.bindTooltip("80% chance of Below Average Temperature");
                  break;
                case 90:
                  layer.bindTooltip("90% chance of Below Average Temperature");
                  break;
              }
            }
          });
        }

        temp610dayLayer.query()
          .run(function(error, featureCollection){
          validmonth = featureCollection.features[0].properties.start_date;
          releasemonth = featureCollection.features[0].properties.fcst_date;
          console.log(featureCollection.features[0].properties);
          // Set initial title and valid period for monthly drought outlook
          $('#temp-map-header .title').text("U.S. 6 to 10 Day Temperature Outlook");
          $('#temp-map-header .valid-dates').text("Valid for " + new Date(validmonth) + ", Released " + new Date(releasemonth));
        });
        var temp610dayChecked = $('#temp-map__view-select input[type=radio][id=temp610day]:checked');
        var temp814dayChecked = $('#temp-map__view-select input[type=radio][id=temp814day]:checked');

        if (temp610dayChecked) {
          $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/610day/610temp.new.gif');
        }
        else if (temp814Checked) {
          $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/814day/814temp.new.gif');
        }

        //change the layers of the map to Monthly or temp based on the dropdown list
        $('input[name=temp-map-duration]').on('change', function() {
          if (this.value == 'temp610day') {
            removePrevLayer();
            currentLayer = temp610dayLayer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);

            //hide Select a Lead
            $('#lead-selector').hide();
            $('#temp-map-header .title').text("U.S. 6 to 10 Day Temperature Outlook");
            $('#temp-map-header .valid-dates').text("Valid for " + new Date(validmonth) + ", Released " + new Date(releasemonth));
            $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/610day/610temp.new.gif');
          }
          else if (this.value == 'temp814day') {
            removePrevLayer();
            currentLayer = temp814dayLayer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);

            //hide Select a Lead
            $('#lead-selector').hide();

            $('#temp-map-header .title').text("U.S. 8 to 14 Day Temperature Outlook");
            $('#temp-map-header .valid-dates').text("Valid for " + new Date(validmonth) + ", Released " + new Date(releasemonth));
            $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/814day/814temp.new.gif');
          }
          else if (this.value == 'tempmonthly') {
            removePrevLayer();
            currentLayer = tempMonthlyLayer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);

            //hide Select a Lead
            $('#lead-selector').hide();

            $('#temp-map-header .title').text("U.S. Monthly Temperature Outlook");
            $('#temp-map-header .valid-dates').text("Valid for " + new Date(validmonth) + ", Released " + new Date(releasemonth));
            $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead14/off14_temp.gif');
          }
          else if (this.value == 'temp3month') {
            removePrevLayer();
            currentLayer = temp3MonthLead1Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);

            //Show Select a Lead
            $('#lead-selector').show();
            $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook");
            $('#temp-map-header .valid-dates').text("Valid for " + new Date(validmonth) + ", Released " + new Date(releasemonth));
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
          }
          else if (this.value == 'alaska') {
            tempmap.setView(new L.LatLng(64.2,-149.4), 3.9)
          }
        });

        var slider = $('#opacity-level')[0];
        // var output = document.getElementById("sliderValue");
        var output = $('.opacity-slider__value')[0];

        var opacityVal = $('.opacity-slider__range').val();
        // Convert opacity decimal value to percent
        var percent = Math.round(slider.value * 100);
        //console.log(percent);
        // Write percent value in html label area
        $('.opacity-slider__value').html(percent);

        output.innerHTML = percent;
        slider.oninput = function() {
          output.innerHTML = Math.round(this.value * 100);
          $('.opacity-slider__value').html(percent);
          currentLayer.eachFeature(function(layer){
            layer.setStyle({
              fillOpacity: (slider.value)
            });
          });
        }

        $('[name=lead-options]').on('change', function() {
          if (this.value == 'temp-lead-1') {
            removePrevLayer();
            currentLayer = temp3MonthLead1Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook - Lead 1");
           $('#temp-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead01/off01_temp.gif');
          }
          else if (this.value == 'temp-lead-2') {
            removePrevLayer();
            currentLayer = temp3MonthLead2Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook - Lead 2");
           $('#temp-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead02/off02_temp.gif');
          }
          else if (this.value == 'temp-lead-3') {
            removePrevLayer();
            currentLayer = temp3MonthLead3Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook - Lead 3");
           $('#temp-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead03/off03_temp.gif');
          }
          else if (this.value == 'temp-lead-4') {
            removePrevLayer();
            currentLayer = temp3MonthLead4Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook - Lead 4");
           $('#temp-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead04/off04_temp.gif');
          }
          else if (this.value == 'temp-lead-5') {
            removePrevLayer();
            currentLayer = temp3MonthLead5Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook - Lead 5");
           $('#temp-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead05/off05_temp.gif');
          }
          else if (this.value == 'temp-lead-6') {
            removePrevLayer();
            currentLayer = temp3MonthLead6Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .temp-title').text("U.S. 3 Month Temperature Outlook - Lead 6");
           $('#temp-map-header .temp-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead06/off06_temp.gif');
          }
          else if (this.value == 'temp-lead-7') {
            removePrevLayer();
            currentLayer = temp3MonthLead7Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .temp-title').text("U.S. 3 Month Temperature Outlook - Lead 7");
           $('#temp-map-header .temp-valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead07/off07_temp.gif');
          }
          else if (this.value == 'temp-lead-8') {
            removePrevLayer();
            currentLayer = temp3MonthLead8Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook - Lead 8");
           $('#temp-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead08/off08_temp.gif');
          }
          else if (this.value == 'temp-lead-9') {
            removePrevLayer();
            currentLayer = temp3MonthLead9Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook - Lead 9");
           $('#temp-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'temp-lead-10') {
            removePrevLayer();
            currentLayer = temp3MonthLead10Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook - Lead 10");
           $('#temp-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'temp-lead-11') {
            removePrevLayer();
            currentLayer = temp3MonthLead11Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook - Lead 11");
           $('#temp-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'temp-lead-12') {
            removePrevLayer();
            currentLayer = temp3MonthLead12Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook - Lead 12");
           $('#temp-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'temp-lead-13') {
            removePrevLayer();
            currentLayer = temp3MonthLead13Layer;
            currentLayer.addTo(tempmap);
            currentLayer.on('load', iterateFeatures);
           $('#temp-map-header .title').text("U.S. 3 Month Temperature Outlook - Lead 13");
           $('#temp-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
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

        document.getElementById('location-container').innerHTML =
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
            document.getElementById('location-container').innerHTML =
                "<a href= https://forecast.weather.gov/MapClick.php?lat=" +
                latitude.toFixed(2)+"&amp;lon="+ longitude.toFixed(2) +
                " target=_blank title='Link to 7 Day Forecast'>7 Day Forecast for " +
                featureCollection.features[0].properties.PO_NAME + ", "+ featureCollection.features[0].properties.STATE+"</a>";
                region = featureCollection.features[0].properties.STATE;
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
    			xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/610day/interactive/includes/get_temps_pie.php?coord="+coord+"&region=conus", true);
    			xmlHttp.send(null);
      }

      function getTempHandlerAlaska(coord) {
    		var xmlHttp = getXMLHttp();
    		xmlHttp.onreadystatechange = function() {
    			//console.log(xmlHttp.readyState);
    			if (xmlHttp.readyState==4 && xmlHttp.status==200) {
    				HandleResponse_Temp(xmlHttp.responseText);
          }
        }
    			xmlHttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.cpc.ncep.noaa.gov/products/predictions/610day/interactive/includes/get_temps_pie.php?coord="+coord+"&region=alaska", true);
    			xmlHttp.send(null);
      }
      function HandleResponse_Temp(response) {
      		response = response.split('#');
      			mint_norm = response[0];
      			maxt_norm = response[1];
      			temp_abv = response[2];
      			temp_blo =  response[3];
      			temp_norm = response[4];
            if (initialLoad){
              if (temp_norm == null)
              {
                drawChartInitial(mint_norm,maxt_norm,temp_abv,temp_blo,temp_norm);
              }
              else
              {
                setTimeout(function(){
                    drawChartInitial(mint_norm,maxt_norm,temp_abv,temp_blo,temp_norm);
                }, 700);
              }
            }
            else
            {
              if (temp_norm == null)
              {
                drawChart(mint_norm,maxt_norm,temp_abv,temp_blo,temp_norm);
              }
              else
              {
                setTimeout(function(){
                    drawChart(mint_norm,maxt_norm,temp_abv,temp_blo,temp_norm);
                }, 700);
              }
            }
        }

      function drawChart(mint_norm,maxt_norm,temp_abv,temp_blo,temp_norm) {

          // Create the data table.
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
      		}
          else {
        		document.getElementById("chart_div_temp_label_max").innerHTML=
              "<font color=black>Three Category Temperature Outlook<br>Normal Maximum Temperature: N/A</font></a>";
        	}

          if (mint_norm > -200) {
        		document.getElementById("chart_div_temp_label_min").innerHTML=
              "<font color=black>Normal Minimum Temperature: </font><strong>"
              + mint_norm + "</strong></a>";
        	}
          else {
      		    document.getElementById("chart_div_temp_label_min").innerHTML="<font color=black>Normal Minimum Temperature: N/A</font></a>";
      		}


          chartTemp = new google.visualization.PieChart(document.getElementById('temp-chart'));
          chartTemp.draw(data, options);
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

     tempmap.invalidateSize();
     //export { tempmap };


    //  }); // .once
  //  } // attach
  //}; // behaviors

})(jQuery);
