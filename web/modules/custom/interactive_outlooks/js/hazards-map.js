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
        const hazardsmap = L.map('hazards-map', {
          center: [38, -96],
          zoomSnap: 0.1,
          zoom: 3.9,
          minZoom: 3.6,
          attributionControl: false
        });

        hazardsmap.whenReady(hideLegend);

        function hideLegend(){
          $('#high-risk-excessive-heat').hide();
          $('#moderate-risk-excessive-heat').hide();
          $('#slight-risk-excessive-heat').hide();

          $('#high-risk-much-above-normal-temperature').hide();
          $('#moderate-risk-much-above-normal-temperature').hide();
          $('#slight-risk-much-above-normal-temperature').hide();

          $('#high-risk-much-below-normal-temperature').hide();
          $('#moderate-risk-much-below-normal-temperature').hide();
          $('#slight-risk-much-below-normal-temperature').hide();

          $('#moderate-risk-high-winds').hide();
          $('#slight-risk-high-winds').hide();

          $('#high-risk-precip').hide();
          $('#moderate-risk-precip').hide();
          $('#slight-risk-precip').hide();

          $('#frozen-precip').hide();
          $('#flooding-possible').hide();
        }

        // Add Esri World Topo basemap via Esri Leaflet plugin
        L.esri.basemapLayer('Gray').addTo(hazardsmap);

        // Get URL to place boundaries layer
        const boundariesUrl = 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/';

        // Create a map pane for the boundaries
        hazardsmap.createPane('boundaries');

        // Define the boundaries pane when creating the dynamicMapLayer
        L.esri.dynamicMapLayer({
          url: boundariesUrl,
          pane: 'boundaries',
          opacity: 0.25
        }).addTo(hazardsmap);

        // Get URL to place cities layer
        const citiesUrl = 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/';

        // Create a map pane for the city labels
        hazardsmap.createPane('cities');

        // Define the cities pane when creating the dynamicMapLayer
        L.esri.dynamicMapLayer({
          url: citiesUrl,
          pane: 'cities',
          opacity: 0.75
        }).addTo(hazardsmap);

        // Create a map pane for the outlooks
        hazardsmap.createPane('outlooks');

        // Get link to 8-14 day KML files found at https://www.cpc.ncep.noaa.gov/products/predictions/threats/threats.php
        const prcp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/prcp_D8_14.kml";
        const probPrcp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/prcp_prob_D8_14.kml";
        const temp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/temp_D8_14.kml";
        const probTemp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/temp_prob_D8_14.kml";

        // const excessHeat814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/excess_heat_D8_14.kml";
        const wind814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/wind_D8_14.kml";
        const probExcessHeat814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/excess_heat_prob_D8_14.kml";
        const probWind814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/wind_prob_D8_14.kml";
        const snow814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/snow_D8_14.kml";
        const probSnow814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/snow_prob_D8_14.kml";

        // We need to use the direct URL to the KML files (instead of downloading them to a directory in our module) because they're automatically updated. Using the direct URL produces errors on a development site, however, so we have to append it to a proxy URL
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        // Create the layers based on the URL and proxy URL
        var prcp814kmlLayer = omnivore.kml(proxyurl + prcp814kml);
        var probPrcp814kmlLayer = omnivore.kml(proxyurl + probPrcp814kml);
        var temp814kmlLayer = omnivore.kml(proxyurl + temp814kml);
        var probTemp814kmlLayer = omnivore.kml(proxyurl + probTemp814kml);
        // var excessHeat814kmlLayer = new L.KML(proxyurl + excessHeat814kml, {async: true});
        var probExcessHeat814kmlLayer = omnivore.kml(proxyurl + probExcessHeat814kml);
        var wind814kmlLayer = omnivore.kml(proxyurl + wind814kml);
        var probWind814kmlLayer = omnivore.kml(proxyurl + probWind814kml);
        var snow814kmlLayer = omnivore.kml(proxyurl + snow814kml);
        var probSnow814kmlLayer = omnivore.kml(proxyurl + probSnow814kml);

        // Add the layers to the map
        hazardsmap.addLayer(prcp814kmlLayer);
        hazardsmap.addLayer(probPrcp814kmlLayer);
        hazardsmap.addLayer(temp814kmlLayer);
        hazardsmap.addLayer(probTemp814kmlLayer);
        // hazardsmap.addLayer(excessHeat814kmlLayer);
        hazardsmap.addLayer(probExcessHeat814kmlLayer);
        hazardsmap.addLayer(wind814kmlLayer);
        hazardsmap.addLayer(probWind814kmlLayer);
        hazardsmap.addLayer(snow814kmlLayer);
        hazardsmap.addLayer(probSnow814kmlLayer);


        var probTemp814chkBox = "";

        $.ajax({
            type     : "GET",
            url      : proxyurl + prcp814kml,
            dataType : "xml",
            success  : getDataPrcp814kmlLayer,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });

        function getDataPrcp814kmlLayer(xml) {
          const dateInfo = $(xml).find("Document").first().attr("id");
          const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));
          if (noHazards === "No_Hazards_Posted")
          {
            $('#precip-hazards-814-chkbox').hide();
          }
          else
          {
            $('#precip-hazards-814-no-hazards').hide();
          }

          $(xml).find("Placemark").each(function(){
            var x = $(this).find("name").text();
            switch(x) {
              case "High Risk of Heavy Precipitation":
                $('#high-risk-precip').show();
                break;
              case "Heavy Precipitation":
                $('#high-risk-precip').show();
                break;
              case "Moderate Risk of Heavy Precipitation":
                $('#moderate-risk-precip').show();
                break;
              case "Slight Risk of Heavy Precipitation":
                 $('#slight-risk-precip').show();
                break;
              case "Frozen Precipitation":
                $('#frozen-precip').show();
                break;
              case "Flooding Possible":
                $('#flooding-possible').show();
                break;
              }
          });

          prcp814kmlLayer.eachLayer(function(layer){
            //layer.bindPopup(layer.feature.properties.description);
            switch(layer.feature.properties.name){
              case "High Risk of Heavy Precipitation":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#879B57',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Heavy Precipitation":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#C4EC74',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Moderate Risk of Heavy Precipitation":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#C4EC74',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Slight Risk of Heavy Precipitation":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#E4FCA8',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
              break;
              case "Frozen Precipitation":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#5DA7BF',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
              case "Flooding Possible":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#F1E1FD',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
            }
          });
        }

        $.ajax({
            type     : "GET",
            url      : proxyurl + probPrcp814kml,
            dataType : "xml",
            success  : getDataProbPrcp814kml,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });

        function getDataProbPrcp814kml(xml) {
          const dateInfo = $(xml).find("Document").first().attr("id");
          const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));
          if (noHazards === "No_Hazards_Posted")
          {
            //hide checkbox and display No Hazards
            $('#precip-probabilistic-814-chkbox').hide();
          }
          else
          {
            $('#precip-probabilistic-814-no-hazards').hide();
          }

          $(xml).find("Placemark").each(function(){
            var x = $(this).find("name").text();
            switch(x) {
              case "High Risk of Heavy Precipitation":
                $('#high-risk-precip').show();
                break;
              case "Heavy Precipitation":
                $('#moderate-risk-precip').show();
                break;
              case "Moderate Risk of Heavy Precipitation":
                $('#moderate-risk-precip').show();
                break;
              case "Slight Risk of Heavy Precipitation":
                 $('#slight-risk-precip').show();
                break;
              case "Frozen Precipitation":
                $('#frozen-precip').show();
                break;
              case "Flooding Possible":
                $('#flooding-possible').show();
                break;
              }
          });

          probPrcp814kmlLayer.eachLayer(function(layer){
            //layer.bindPopup(layer.feature.properties.description);
            switch(layer.feature.properties.name){
              case "High Risk of Heavy Precipitation":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#879B57',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Heavy Precipitation":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#C4EC74',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Moderate Risk of Heavy Precipitation":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#C4EC74',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Slight Risk of Heavy Precipitation":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#E4FCA8',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
              break;
              case "Frozen Precipitation":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#5DA7BF',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
              case "Flooding Possible":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#F1E1FD',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
            }
          });
        }

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
          const validDateString = dateInfo.substring(dateInfo.indexOf("Valid"));
          const validDates = validDateString.replace('No Hazards Posted', '');

          var hazardsValidStartDateString = new Date(validDateString.substring(7,17));
          var hazardsValidEndDateString = new Date(validDateString.substring(20,30));
          var hazardsReleaseDateString = new Date(dateInfo.substring(38,48));

          var hazardsValidDate = hazardsValidStartDateString.toLocaleDateString("en-US", options) + ' - ' + hazardsValidEndDateString.toLocaleDateString("en-US", options);
          var hazardsReleaseDate = hazardsReleaseDateString.toLocaleDateString("en-US", options);

          // $("#hazards-map-header .valid-dates").append(validDates).text();
          $('#hazards-map-header .valid-dates').html("Valid: " + hazardsValidDate + "<br> Released: " + hazardsReleaseDate);

          const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));
          if (noHazards === "No_Hazards_Posted")
          {
            //hide checkbox and display No Hazards
            $('#temp-hazards-814-chkbox').hide();
          }
          else
          {
            $('#temp-hazards-814-no-hazards').hide();
          }

          $(xml).find("Placemark").each(function(){
            var x = $(this).find("name").text();
            switch(x) {
              case "High Risk of Much Above Normal Temperatures":
                $('#high-risk-much-above-normal-temperature').show();
                break;
              case "Moderate Risk of Much Above Normal Temperatures":
                $('#moderate-risk-much-above-normal-temperature').show();
                break;
              case "Slight Risk of Much Above Normal Temperatures":
                 $('#slight-risk-much-above-normal-temperature').show();
                break;
              case "High Risk of Much Below Normal Temperatures":
                $('#high-risk-much-below-normal-temperature').show();
                break;
              case "Moderate Risk of Much Below Normal Temperatures":
                $('#moderate-risk-much-below-normal-temperature').show();
                break;
              case "Slight Risk of Much Below Normal Temperatures":
                 $('#slight-risk-much-below-normal-temperature').show();
                break;
              }

              temp814kmlLayer.eachLayer(function(layer){
                //layer.bindPopup(layer.feature.properties.description);
                switch(layer.feature.properties.name){
                  case "High Risk of Much Above Normal Temperatures":
                    layer.bindTooltip(layer.feature.properties.name);
                    layer.setStyle({
                      fillColor: '#B95550',
                      fillOpacity: .7,
                      color: 'black',
                      opacity: .7,
                      weight: 1
                    })
                    break;
                  case "Moderate Risk of Much Above Normal Temperatures":
                    layer.bindTooltip(layer.feature.properties.name);
                    layer.setStyle({
                      fillColor: '#E35A52',
                      fillOpacity: .7,
                      color: 'black',
                      opacity: .7,
                      weight: 1
                    })
                    break;
                  case "Slight Risk of Much Above Normal Temperatures":
                    layer.bindTooltip(layer.feature.properties.name);
                    layer.setStyle({
                      fillColor: '#F7A9A7',
                      fillOpacity: .7,
                      color: 'black',
                      opacity: .7,
                      weight: 1
                    })
                    break;
                    case "High Risk of Much Below Normal Temperatures":
                      layer.bindTooltip(layer.feature.properties.name);
                      layer.setStyle({
                        fillColor: '#4F6899',
                        fillOpacity: .7,
                        color: 'black',
                        opacity: .7,
                        weight: 1
                      })
                      break;
                    case "Moderate Risk of Much Below Normal Temperatures":
                      layer.bindTooltip(layer.feature.properties.name);
                      layer.setStyle({
                        fillColor: '#538FE8',
                        fillOpacity: .7,
                        color: 'black',
                        opacity: .7,
                        weight: 1
                      })
                      break;
                    case "Slight Risk of Much Below Normal Temperatures":
                      layer.bindTooltip(layer.feature.properties.name);
                      layer.setStyle({
                        fillColor: '#A2C9FB',
                        fillOpacity: .7,
                        color: 'black',
                        opacity: .7,
                        weight: 1
                      })
                      break;
                      case "Excessive Heat":
                      layer.bindTooltip(layer.feature.properties.name);
                      layer.setStyle({
                        fillColor: '#B95550',
                        fillOpacity: .7,
                        color: 'black',
                        opacity: .7,
                        weight: 1
                      })
                }
              });
          });
        }

        $.ajax({
          type     : "GET",
          url      : proxyurl + probTemp814kml,
          dataType : "xml",
          success  : getDataProbTemp814kml,
          error    : function(){
            console.log("Could not retrieve XML file.");
          }
        });

        function getDataProbTemp814kml(xml) {
          const dateInfo = $(xml).find("Document").first().attr("id");
          const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));
          if (noHazards === "No_Hazards_Posted")
          {
            //hide checkbox and display No Hazards
            //only hide if both this layer and Excess Heat layer have no hazards
            probTemp814chkBox = false
            //dont hide checkbox until we check the excess heat layer
            //$('#temp-probabilistic-814-chkbox').hide();
          }
          else
          {
            probTemp814chkBox = true
            // $('#temp-probabilistic-814-no-hazards').hide();
          }

          $(xml).find("Placemark").each(function(){
            var x = $(this).find("name").text();
            switch(x) {
              case "High Risk of Much Above Normal Temperatures":
                $('#high-risk-much-above-normal-temperature').show();
                break;
              case "Moderate Risk of Much Above Normal Temperatures":
                $('#moderate-risk-much-above-normal-temperature').show();
                break;
              case "Slight Risk of Much Above Normal Temperatures":
                 $('#slight-risk-much-above-normal-temperature').show();
                break;
              case "High Risk of Much Below Normal Temperatures":
                $('#high-risk-much-below-normal-temperature').show();
                break;
              case "Moderate Risk of Much Below Normal Temperatures":
                $('#moderate-risk-much-below-normal-temperature').show();
                break;
              case "Slight Risk of Much Below Normal Temperatures":
                 $('#slight-risk-much-below-normal-temperature').show();
                break;
              }

              probTemp814kmlLayer.eachLayer(function(layer){
                layer.bindPopup(layer.feature.properties.name);
                switch(layer.feature.properties.name){
                  case "High Risk of Much Above Normal Temperatures":
                    //layer.bindTooltip(layer.feature.properties.name);
                    layer.setStyle({
                      fillColor: '#B95550',
                      fillOpacity: .7,
                      color: 'black',
                      opacity: .7,
                      weight: 1
                    })
                    break;
                  case "Moderate Risk of Much Above Normal Temperatures":
                    //layer.bindTooltip(layer.feature.properties.name);
                    layer.setStyle({
                      fillColor: '#E35A52',
                      fillOpacity: .7,
                      color: 'black',
                      opacity: .7,
                      weight: 1
                    })
                    break;
                  case "Slight Risk of Much Above Normal Temperatures":
                    //layer.bindTooltip(layer.feature.properties.name);
                    layer.setStyle({
                      fillColor: '#F7A9A7',
                      fillOpacity: .7,
                      color: 'black',
                      opacity: .7,
                      weight: 1
                    })
                    break;
                  case "High Risk of Much Below Normal Temperatures":
                    //layer.bindTooltip(layer.feature.properties.name);
                    layer.setStyle({
                      fillColor: '#4F6899',
                      fillOpacity: .7,
                      color: 'black',
                      opacity: .7,
                      weight: 1
                    })
                    break;
                  case "Moderate Risk of Much Below Normal Temperatures":
                    //layer.bindTooltip(layer.feature.properties.name);
                    layer.setStyle({
                      fillColor: '#538FE8',
                      fillOpacity: .7,
                      color: 'black',
                      opacity: .7,
                      weight: 1
                    })
                    break;
                  case "Slight Risk of Much Below Normal Temperatures":
                    //layer.bindTooltip(layer.feature.properties.name);
                    layer.setStyle({
                      fillColor: '#A2C9FB',
                      fillOpacity: .7,
                      color: 'black',
                      opacity: .7,
                      weight: 1
                    })
                    break;
                  case "Flooding Possible":
                    //layer.bindTooltip(layer.feature.properties.name);
                    layer.setStyle({
                      fillColor: '#D3D3D3',
                      fillOpacity: .7,
                      color: 'black',
                      opacity: .7,
                      weight: 1
                    })
                    break;
                  case "Frozen Precipitation":
                    //layer.bindTooltip(layer.feature.properties.name);
                    layer.setStyle({
                    fillColor: '#87CEFA',
                    fillOpacity: .7,
                    color: 'black',
                    opacity: .7,
                    weight: 1
                  })
                    break;
                  case "Severe Weather":
                    //layer.bindTooltip(layer.feature.properties.name);
                    layer.setStyle({
                    fillColor: '#FFC04D',
                    fillOpacity: .7,
                    color: 'black',
                    opacity: .7,
                    weight: 1
                  })

                }
              });
          });

        }

        $.ajax({
          type     : "GET",
          url      : proxyurl + probExcessHeat814kml,
          dataType : "xml",
          success  : getDataExcessHeat,
          error    : function(){
            console.log("Could not retrieve XML file.");
          }
        });

        function getDataExcessHeat(xml) {
          const dateInfo = $(xml).find("Document").first().attr("id");
          const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));
          if (noHazards === "No_Hazards_Posted")
          {
            if (probTemp814chkBox == false){
              $('#temp-probabilistic-814-chkbox').hide();
            }
            else{
              $('#temp-probabilistic-814-no-hazards').hide();
            }
          }
          else
          {
             $('#temp-probabilistic-814-no-hazards').hide();
          }

          $(xml).find("Placemark").each(function(){
            var x = $(this).find("name").text();
            switch(x) {
              case "High Risk of Excessive Heat":
                $('#high-risk-excessive-heat').show();
                break;
              case "Moderate Risk of Excessive Heat":
                $('#moderate-risk-excessive-heat').show();
                break;
              case "Slight Risk of Excessive Heat":
                 $('#slight-risk-excessive-heat').show();
                break;
              }
          });

          probExcessHeat814kmlLayer.eachLayer(function(layer){
            //layer.bindPopup(layer.feature.properties.description);
            switch(layer.feature.properties.name){
              case "High Risk of Excessive Heat":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#96524F',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Moderate Risk of Excessive Heat":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#B95550',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Slight Risk of Excessive Heat":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#C57554',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              }
          });

        }

        $.ajax({
          type     : "GET",
          url      : proxyurl + wind814kml,
          dataType : "xml",
          success  : getDataWind814kml,
          error    : function(){
            console.log("Could not retrieve XML file.");
          }
        });

        function getDataWind814kml(xml) {
          const dateInfo = $(xml).find("Document").first().attr("id");
          const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));
          if (noHazards === "No_Hazards_Posted")
          {
            //hide checkbox and display No Hazards
            $('#wind-hazards-814-chkbox').hide();
          }
          else
          {
            $('#wind-hazards-814-no-hazards').hide();
          }

          $(xml).find("Placemark").each(function(){
            var x = $(this).find("name").text();
            switch(x) {
              case "Moderate Risk of High Winds":
                $('#moderate-risk-high-winds').show();
                break;
              case "Slight Risk of High Winds":
                 $('#slight-risk-high-winds').show();
                break;
            }
          });

          wind814kmlLayer.eachLayer(function(layer){
            //layer.bindPopup(layer.feature.properties.description);
            switch(layer.feature.properties.name){
              case "Moderate Risk of High Winds":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#986951',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Slight Risk of High Winds":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#DAC499',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              }
          });
        }

        $.ajax({
          type     : "GET",
          url      : proxyurl + probWind814kml,
          dataType : "xml",
          success  : getDataProbWind814kml,
          error    : function(){
            console.log("Could not retrieve XML file.");
          }
        });

        function getDataProbWind814kml(xml) {
          const dateInfo = $(xml).find("Document").first().attr("id");
          const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));
          if (noHazards === "No_Hazards_Posted")
          {
            //hide checkbox and display No Hazards
            $('#wind-probabilistic-814-chkbox').hide();
          }
          else
          {
            $('#wind-probabilistic-814-no-hazards').hide();
          }

          $(xml).find("Placemark").each(function(){
            var x = $(this).find("name").text();
            switch(x) {
              case "Moderate Risk of High Winds":
                $('#moderate-risk-high-winds').show();
                break;
              case "Slight Risk of High Winds":
                 $('#slight-risk-high-winds').show();
                break;
            }
          });

          probWind814kmlLayer.eachLayer(function(layer){
            //layer.bindPopup(layer.feature.properties.description);
            switch(layer.feature.properties.name){
              case "Moderate Risk of High Winds":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#986951',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Slight Risk of High Winds":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#DAC499',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              }
          });
        }


        $.ajax({
          type     : "GET",
          url      : proxyurl + snow814kml,
          dataType : "xml",
          success  : getDataSnow814kml,
          error    : function(){
            console.log("Could not retrieve XML file.");
          }
        });

        function getDataSnow814kml(xml) {
          const dateInfo = $(xml).find("Document").first().attr("id");
          const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));
          if (noHazards === "No_Hazards_Posted")
          {
            //hide checkbox and display No Hazards
            $('#snow-hazards-814-chkbox').hide();
          }
          else
          {
            $('#snow-hazards-814-no-hazards').hide();
          }

          $(xml).find("Placemark").each(function(){
            var x = $(this).find("name").text();
            switch(x) {
              case "High Risk of Heavy Snow":
                $('#high-risk-heavy-snow').show();
                break;
              case "Moderate Risk of Heavy Snow":
                 $('#moderate-risk-heavy-snow').show();
              case "Slight Risk of Heavy Snow":
                $('#slight-risk-heavy-snow').show();
                break;
            }
          });

          snow814kmlLayer.eachLayer(function(layer){
            //layer.bindPopup(layer.feature.properties.description);
            switch(layer.feature.properties.name){
              case "High Risk of Heavy Snow":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#CC419A',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Moderate Risk of Heavy Snow":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#ED81A1',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Slight Risk of Heavy Snow":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#A044DC',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              }
          });
        }

        $.ajax({
          type     : "GET",
          url      : proxyurl + probSnow814kml,
          dataType : "xml",
          success  : getDataProbSnow814kml,
          error    : function(){
            console.log("Could not retrieve XML file.");
          }
        });

        function getDataProbSnow814kml(xml) {
          const dateInfo = $(xml).find("Document").first().attr("id");
          const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));
          if (noHazards === "No_Hazards_Posted")
          {
            //hide checkbox and display No Hazards
            $('#snow-probabilistic-814-chkbox').hide();
          }
          else
          {
            $('#snow-probabilistic-814-no-hazards').hide();
          }

          $(xml).find("Placemark").each(function(){
            var x = $(this).find("name").text();
            switch(x) {
              case "High Risk of Heavy Snow":
                $('#high-risk-heavy-snow').show();
                break;
              case "Moderate Risk of Heavy Snow":
                $('#moderate-risk-high-winds').show();
                break;
              case "Slight Risk of Heavy Snow":
                 $('#slight-risk-high-snow').show();
                break;
            }
          });

          probSnow814kmlLayer.eachLayer(function(layer){
            //layer.bindPopup(layer.feature.properties.description);
            switch(layer.feature.properties.name){
              case "High Risk of Heavy Snow":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#CC419A',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Moderate Risk of Heavy Snow":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#ED81A1',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              case "Slight Risk of Heavy Snow":
                layer.bindTooltip(layer.feature.properties.name);
                layer.setStyle({
                  fillColor: '#A044DC',
                  fillOpacity: .7,
                  color: 'black',
                  opacity: .7,
                  weight: 1
                })
                break;
              }
          });
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
            // hazardsmap.addLayer(excessHeat814kmlLayer)
          } else {
            hazardsmap.removeLayer(temp814kmlLayer)
            // hazardsmap.removeLayer(excessHeat814kmlLayer)
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
            if (this.value === 'conus') {
              hazardsmap.setView(new L.LatLng(38, -96), 3.9)
            }
            else if (this.value === 'alaska') {
              hazardsmap.setView(new L.LatLng(63.2,-150), 3.6)
            }
        });

        hazardsmap.invalidateSize();
        //export { hazardsmap };

})(jQuery);
