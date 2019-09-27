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
        var tempmap = L.map('temp-map', {
          center: [38, -96],
          zoomSnap: 0.1,
          zoom: 3.9,
          minZoom: 3.9
        });

        // Add Esri World Topo base map via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(tempmap);

        // Get link to layer data
        const temp610day = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/0/";

        // create monhtly drought layer
        // var temp610dayLayer = new L.esri.featureLayer({
        //   url: temp610day
        // });

        // another feature layer with unique value renderer defined in the service
        var temp610dayLayer = L.esri.featureLayer({
          url:'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/0'
        }).addTo(tempmap);

        // var temp814dayLayer = new L.tileLayer.wms('https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Climate_Outlooks/cpc_8_14_day_outlk/MapServer/WMSServer?',{
        //   layers: '1',
        //   format: 'image/png',
        //   transparent: true,
        //   opacity: 0.6
        // });

        var temp814dayLayer = L.esri.featureLayer({
          url:'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_8_14_day_outlk/MapServer/0'
        });


        //Add temp814 map on load (then remove it) or the layer styles won't be applied
        //temp814dayLayer.addTo(tempmap);
        temp814dayLayer.removeFrom(tempmap);

        var validmonth = "";
        var releasemonth = "";

        // temp610dayLayer.metadata(function(error, metadata){
        //   console.log(metadata);
        // });

        temp610dayLayer.on('load', iterateFeatures);

        function iterateFeatures () {
          temp610dayLayer.eachFeature(function(layer) {
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

        temp814dayLayer.on('load', iterateFeatures814);

        function iterateFeatures814 () {
          temp814dayLayer.eachFeature(function(layer) {
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

          // Set initial title and valid period for monthly drought outlook
          $('#temp-map-header .title').text("U.S. 6 to 10 Day Temperature Outlook");
          $('#temp-map-header .valid-dates').text("Valid for " + new Date(validmonth) + ", Released " + new Date(releasemonth));
          });


        var temp610dayChecked = $('#temp-map__view-select input[type=radio][id=temp610day]:checked');
        var temp814dayChecked = $('#temp-map__view-select input[type=radio][id=temp814day]:checked');

        if (temp610dayChecked) {
          $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
        } else if (temp814Checked) {
          $('.temp-image li a').attr('href', '');
        }

        //change the layers of the map to Monthly or precip based on the dropdown list
        $('input[name=temp-map-duration]').on('change', function() {
          if (this.value == 'temp610day') {
           temp814dayLayer.removeFrom(tempmap);
           temp610dayLayer.addTo(tempmap);
           $('#temp-map-header .title').text("U.S. 6 to 10 Day Temperature Outlook");
           $('#temp-map-header .valid-dates').text("Valid for " + new Date(validmonth) + ", Released " + new Date(releasemonth));
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'temp814day') {
           temp610dayLayer.removeFrom(tempmap);
           temp814dayLayer.addTo(tempmap);
           $('#temp-map-header .title').text("U.S. 8 to 14 Day Temperature Outlook");
           $('#temp-map-header .valid-dates').text("Valid for " + new Date(validmonth) + ", Released " + new Date(releasemonth));
           $('.temp-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/season_drought.png');
          }
        });

        //change the map to the correct area
        $('input[type=radio][name=temp-map-view]').on('change',function() {
          if (this.value == 'conus') {
            tempmap.setView(new L.LatLng(38, -96), 3.9)
          }
          else if (this.value == 'alaska') {
            tempmap.setView(new L.LatLng(64.2,-149.4), 3.9)
          }
        });


        var slider = $('#myRange')[0];
        // var output = document.getElementById("sliderValue");
        var output = $('#sliderValue')[0];
        output.innerHTML = slider.value;

        slider.oninput = function() {
          output.innerHTML = this.value;

          temp610dayLayer.eachFeature(function(layer){
            layer.setStyle({
              fillOpacity: (slider.value / 120)
            });
          });
        }

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
        data.addColumn('string', 'Category');
        data.addColumn('number', 'Count');
        data.addRows([
          ['Above Average', 3],
          ['Below Average', 1],
          ['Near Normal', 1]
        ]);

        // Set chart options
        var options = {'title':'Three Category Temperature Outlook',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('temp-chart'));
        chart.draw(data, options);
      }



    //  }); // .once
  //  } // attach
  //}; // behaviors

})(jQuery);
