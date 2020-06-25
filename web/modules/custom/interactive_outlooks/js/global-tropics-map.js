/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
  "use strict";

        // Create the map
        const globaltropicsmap = L.map('global-tropics-map', {
          center: [20,5],
          zoomSnap: 0.1,
          zoom: 1.5,
          attributionControl: false
        });

        // Add Esri World Topo base map via Esri Leaflet plugin
        L.esri.basemapLayer('Gray').addTo(globaltropicsmap);

        // Get URL to place boundaries layer
        const boundariesUrl = 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/';

        // Create a map pane for the boundaries
        globaltropicsmap.createPane('boundaries');

        // Define the boundaries pane when creating the dynamicMapLayer
        L.esri.dynamicMapLayer({
          url: boundariesUrl,
          pane: 'boundaries',
          opacity: 0.25
        }).addTo(globaltropicsmap);

        // Get URL to place the cities layer
        const citiesUrl = 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/';

        // Create a map pane for the city labels
        globaltropicsmap.createPane('cities');

        // Define the cities pane when creating the dynamicMapLayer
        L.esri.dynamicMapLayer({
          url: citiesUrl,
          pane: 'cities',
          opacity: 0.75
        }).addTo(globaltropicsmap);

        // Create a map pane for the outlooks
        globaltropicsmap.createPane('outlooks');


        // Get link to  KML files found at https://www.cpc.ncep.noaa.gov/products/predictions/threats/threats.php
        const week1TropicalCyclonekml = "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/ghazards/KMZs/TC_WK1.kml";
        const week2TropicalCyclonekml = "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/ghazards/KMZs/TC_WK2.kml";
        const week1UpperTercilePrecipkml = "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/ghazards/KMZs/WET_WK1.kml";
        const week2UpperTercilePrecipkml = "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/ghazards/KMZs/WET_WK2.kml";
        const week1LowerTercilePrecipkml = "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/ghazards/KMZs/DRY_WK1.kml";
        const week2LowerTercilePrecipkml = "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/ghazards/KMZs/DRY_WK2.kml";
        const week1AboveNormalTempkml = "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/ghazards/KMZs/WARM_WK1.kml";
        const week2AboveNormalTempkml = "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/ghazards/KMZs/WARM_WK2.kml";
        const week1BelowNormalTempkml = "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/ghazards/KMZs/COLD_WK1.kml";
        const week2BelowNormalTempkml = "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/ghazards/KMZs/COLD_WK2.kml";


        // We need to use the direct URL to the KML files (instead of downloading them to a directory in our module) because they're automatically updated. Using the direct URL produces errors on a development site, however, so we have to append it to a proxy URL
        const proxyurl = "https://cors-anywhere.herokuapp.com/";


        // Create the layers based on the URL and proxy URL
        var week1TropicalCycloneLayer = omnivore.kml((proxyurl + week1TropicalCyclonekml));
        var week2TropicalCycloneLayer = omnivore.kml((proxyurl + week2TropicalCyclonekml));
        var week1UpperTercilePrecipLayer = omnivore.kml((proxyurl + week1UpperTercilePrecipkml));
        var week2UpperTercilePrecipLayer = omnivore.kml((proxyurl + week2UpperTercilePrecipkml));
        var week1LowerTercilePrecipLayer = omnivore.kml((proxyurl + week1LowerTercilePrecipkml));
        var week2LowerTercilePrecipLayer = omnivore.kml((proxyurl + week2LowerTercilePrecipkml));
        var week1AboveNormalTempLayer = omnivore.kml((proxyurl + week1AboveNormalTempkml));
        var week2AboveNormalTempLayer = omnivore.kml((proxyurl + week2AboveNormalTempkml));
        var week1BelowNormalTempLayer = omnivore.kml((proxyurl + week1BelowNormalTempkml));
        var week2BelowNormalTempLayer = omnivore.kml((proxyurl + week2BelowNormalTempkml));


         // Add the layers to the map
         globaltropicsmap.addLayer(week1TropicalCycloneLayer);
         globaltropicsmap.addLayer(week1UpperTercilePrecipLayer);
         globaltropicsmap.addLayer(week1LowerTercilePrecipLayer);
         globaltropicsmap.addLayer(week1AboveNormalTempLayer);
         globaltropicsmap.addLayer(week1BelowNormalTempLayer);

         var globalTropicsValidDateWeek1;
         var globalTropicsReleaseDateWeek1;
         var globalTropicsValidDateWeek2;
         var globalTropicsReleaseDateWeek2;


         $.ajax({
            type     : "GET",
            url      : proxyurl + week1TropicalCyclonekml,
            dataType : "xml",
            success  : getDataWeek1TropicalCyclonekml,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });


          $('#global-tropics-map-header .title').text("U.S. Global Tropics Hazards Outlooks - Week 1");
          $('#global-tropics-map-header .valid-dates').html("Valid: "  + "<br> Released: ");


          function getDataWeek1TropicalCyclonekml(xml) {
            const dateInfo = $(xml).find("Document").first().attr("id");
            const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));

            var globalTropicsValidStartDateString = new Date(dateInfo.substring(58,68));
            var globalTropicsValidEndDateString = new Date(dateInfo.substring(68,78));

            var globalTropicsReleaseDateString = new Date(dateInfo.substring(39,49));

            globalTropicsValidDateWeek1 = globalTropicsValidStartDateString.toLocaleDateString("en-US", options) + ' - ' + globalTropicsValidEndDateString.toLocaleDateString("en-US", options);
            globalTropicsReleaseDateWeek1 = globalTropicsReleaseDateString.toLocaleDateString("en-US", options);

            $('#global-tropics-map-header .valid-dates').html("Valid: " + globalTropicsValidDateWeek1 + "<br> Released: " + globalTropicsReleaseDateWeek1);

            week1TropicalCycloneLayer.eachLayer(function(layer){
              switch(layer.feature.properties.styleUrl){
                case "#PolyStyle00":
                  layer.bindTooltip("High development of a tropical cyclone");
                  layer.setStyle({
                    fillColor: 'red',
                    fillOpacity: .7,
                    color: 'black',
                    opacity: .7,
                    weight: 1,
                  })
                  break;
                default:
                  layer.bindTooltip("Moderate development of a tropical cyclone");
                  layer.setStyle({
                    fillColor: 'red',
                    fillOpacity: .7,
                    color: 'white',
                    opacity: .7,
                    weight: 2,
                    dashArray: '3'
                  })
                  break;
              }
            });
          }

          $.ajax({
            type     : "GET",
            url      : proxyurl + week2TropicalCyclonekml,
            dataType : "xml",
            success  : getDataWeek2TropicalCyclonekml,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });


          function getDataWeek2TropicalCyclonekml(xml) {
            const dateInfo = $(xml).find("Document").first().attr("id");
            const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));

            var globalTropicsValidStartDateString = new Date(dateInfo.substring(58,68));
            var globalTropicsValidEndDateString = new Date(dateInfo.substring(68,78));

            var globalTropicsReleaseDateString = new Date(dateInfo.substring(39,49));

            globalTropicsValidDateWeek2 = globalTropicsValidStartDateString.toLocaleDateString("en-US", options) + ' - ' + globalTropicsValidEndDateString.toLocaleDateString("en-US", options);
            globalTropicsReleaseDateWeek2 = globalTropicsReleaseDateString.toLocaleDateString("en-US", options);

            week2TropicalCycloneLayer.eachLayer(function(layer){
              switch(layer.feature.properties.styleUrl){
                case "#PolyStyle00":
                  layer.bindTooltip("High Confidence development of a tropical cyclone");
                  layer.setStyle({
                    fillColor: 'red',
                    fillOpacity: .7,
                    color: 'black',
                    opacity: .7,
                    weight: 1,
                  })
                  break;
                default:
                  layer.bindTooltip("Moderate Confidence development of a tropical cyclone");
                  layer.setStyle({
                    fillColor: 'red',
                    fillOpacity: .7,
                    color: 'white',
                    opacity: .7,
                    weight: 2,
                    dashArray: '3'
                  })
                  break;
              }
            });
          }


          $.ajax({
            type     : "GET",
            url      : proxyurl + week1UpperTercilePrecipkml,
            dataType : "xml",
            success  : getDatWeek1UpperTercilePrecipkml,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });

          function getDatWeek1UpperTercilePrecipkml(xml) {
            const dateInfo = $(xml).find("Document").first().attr("id");
            const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));

            week1UpperTercilePrecipLayer.eachLayer(function(layer){
              switch(layer.feature.properties.styleUrl){
                case "#PolyStyle00":
                  layer.bindTooltip("High Confidence weekly total rainfall in the upper third of the historical range");
                  layer.setStyle({
                    fillColor: 'lime',
                    fillOpacity: .7,
                    color: 'black',
                    opacity: .7,
                    weight: 1,
                  })
                  break;
                default:
                  layer.bindTooltip("Moderate Confidence weekly total rainfall in the upper third of the historical range");
                  layer.setStyle({
                    fillColor: 'lime',
                    fillOpacity: .7,
                    color: 'white',
                    opacity: .7,
                    weight: 2,
                    dashArray: '3'
                  })
                  break;
              }
            });
          }

          $.ajax({
            type     : "GET",
            url      : proxyurl + week2UpperTercilePrecipkml,
            dataType : "xml",
            success  : getDatWeek2UpperTercilePrecipkml,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });

          function getDatWeek2UpperTercilePrecipkml(xml) {
            const dateInfo = $(xml).find("Document").first().attr("id");
            const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));

            week2UpperTercilePrecipLayer.eachLayer(function(layer){
              switch(layer.feature.properties.styleUrl){
                case "#PolyStyle00":
                  layer.bindTooltip("High Confidence weekly total rainfall in the <br>upper third of the historical range");
                  layer.setStyle({
                    fillColor: 'lime',
                    fillOpacity: .7,
                    color: 'black',
                    opacity: .7,
                    weight: 1,
                  })
                  break;
                default:
                  layer.bindTooltip("Moderate Confidence weekly total rainfall in the <br>upper third of the historical range");
                  layer.setStyle({
                    fillColor: 'lime',
                    fillOpacity: .7,
                    color: 'white',
                    opacity: .7,
                    weight: 2,
                    dashArray: '3'
                  })
                  break;
              }
            });
          }


          $.ajax({
            type     : "GET",
            url      : proxyurl + week1LowerTercilePrecipkml,
            dataType : "xml",
            success  : getDatWeek1LowerTercilePrecipkml,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });

          function getDatWeek1LowerTercilePrecipkml(xml) {
            const dateInfo = $(xml).find("Document").first().attr("id");
            const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));

            week1LowerTercilePrecipLayer.eachLayer(function(layer){
              switch(layer.feature.properties.styleUrl){
                case "#PolyStyle00":
                  layer.bindTooltip("High Confidence weekly total rainfall in the <br>lower third of the historical range");
                  layer.setStyle({
                    fillColor: 'yellow',
                    fillOpacity: .7,
                    color: 'black',
                    opacity: .7,
                    weight: 1,
                  })
                  break;
                default:
                  layer.bindTooltip("Moderate Confidence weekly total rainfall in the <br>lower third of the historical range");
                  layer.setStyle({
                    fillColor: 'yellow',
                    fillOpacity: .7,
                    color: 'white',
                    opacity: .7,
                    weight: 2,
                    dashArray: '3'
                  })
                  break;
              }
            });
          }


          $.ajax({
            type     : "GET",
            url      : proxyurl + week2LowerTercilePrecipkml,
            dataType : "xml",
            success  : getDatWeek2LowerTercilePrecipkml,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });

          function getDatWeek2LowerTercilePrecipkml(xml) {
            const dateInfo = $(xml).find("Document").first().attr("id");
            const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));

            week2LowerTercilePrecipLayer.eachLayer(function(layer){
              switch(layer.feature.properties.styleUrl){
                case "#PolyStyle00":
                  layer.bindTooltip("High Confidence weekly total rainfall in the <br>lower third of the historical range");
                  layer.setStyle({
                    fillColor: 'yellow',
                    fillOpacity: .7,
                    color: 'black',
                    opacity: .7,
                    weight: 1,
                  })
                  break;
                default:
                  layer.bindTooltip("Moderate Confidence weekly total rainfall in the <br>lower third of the historical range");
                  layer.setStyle({
                    fillColor: 'yellow',
                    fillOpacity: .7,
                    color: 'white',
                    opacity: .7,
                    weight: 2,
                    dashArray: '3'
                  })
                  break;
              }
            });
          }

          $.ajax({
            type     : "GET",
            url      : proxyurl + week1AboveNormalTempkml,
            dataType : "xml",
            success  : getDatWeek1AboveNormalTempkml,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });

          function getDatWeek1AboveNormalTempkml(xml) {
            const dateInfo = $(xml).find("Document").first().attr("id");
            const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));

            week1AboveNormalTempLayer.eachLayer(function(layer){
              switch(layer.feature.properties.styleUrl){
                case "#PolyStyle00":
                  layer.bindTooltip("High Confidence 7 - day mean temperatures in the <br> upper third of the historical range");
                  layer.setStyle({
                    fillColor: 'orange',
                    fillOpacity: .7,
                    color: 'black',
                    opacity: .7,
                    weight: 1,
                  })
                  break;
                default:
                  layer.bindTooltip("Moderate Confidence 7 - day mean temperatures in the <br> upper third of the historical range");
                  layer.setStyle({
                    fillColor: 'orange',
                    fillOpacity: .7,
                    color: 'white',
                    opacity: .7,
                    weight: 2,
                    dashArray: '3'
                  })
                  break;
              }
            });
          }

          $.ajax({
            type     : "GET",
            url      : proxyurl + week2AboveNormalTempkml,
            dataType : "xml",
            success  : getDatWeek2AboveNormalTempkml,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });

          function getDatWeek2AboveNormalTempkml(xml) {
            const dateInfo = $(xml).find("Document").first().attr("id");
            const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));

            week2AboveNormalTempLayer.eachLayer(function(layer){
              switch(layer.feature.properties.styleUrl){
                case "#PolyStyle00":
                  layer.bindTooltip("High Confidence 7 - day mean temperatures in the <br> upper third of the historical range");
                  layer.setStyle({
                    fillColor: 'orange',
                    fillOpacity: .7,
                    color: 'black',
                    opacity: .7,
                    weight: 1,
                  })
                  break;
                default:
                  layer.bindTooltip("Moderate Confidence 7 - day mean temperatures in the <br> upper third of the historical range");
                  layer.setStyle({
                    fillColor: 'orange',
                    fillOpacity: .7,
                    color: 'white',
                    opacity: .7,
                    weight: 2,
                    dashArray: '3'
                  })
                  break;
              }
            });
          }


          $.ajax({
            type     : "GET",
            url      : proxyurl + week1BelowNormalTempkml,
            dataType : "xml",
            success  : getDatWeek1BelowNormalTempkml,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });

          function getDatWeek1BelowNormalTempkml(xml) {
            const dateInfo = $(xml).find("Document").first().attr("id");
            const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));

            week1BelowNormalTempLayer.eachLayer(function(layer){
              switch(layer.feature.properties.styleUrl){
                case "#PolyStyle00":
                  layer.bindTooltip("High Confidence 7 - day mean temperatures in the <br> lower third of the historical range");
                  layer.setStyle({
                    fillColor: 'blue',
                    fillOpacity: .7,
                    color: 'black',
                    opacity: .7,
                    weight: 1,
                  })
                  break;
                default:
                  layer.bindTooltip("Moderate Confidence 7 - day mean temperatures in the <br> lower third of the historical range");
                  layer.setStyle({
                    fillColor: 'blue',
                    fillOpacity: .7,
                    color: 'white',
                    opacity: .7,
                    weight: 2,
                    dashArray: '3'
                  })
                  break;
              }
            });
          }

          $.ajax({
            type     : "GET",
            url      : proxyurl + week2BelowNormalTempkml,
            dataType : "xml",
            success  : getDatWeek2BelowNormalTempkml,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });

          function getDatWeek2BelowNormalTempkml(xml) {
            const dateInfo = $(xml).find("Document").first().attr("id");
            const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));

            week2BelowNormalTempLayer.eachLayer(function(layer){
              switch(layer.feature.properties.styleUrl){
                case "#PolyStyle00":
                  layer.bindTooltip("High Confidence 7 - day mean temperatures in the <br> lower third of the historical range");
                  layer.setStyle({
                    fillColor: 'blue',
                    fillOpacity: .7,
                    color: 'black',
                    opacity: .7,
                    weight: 1,
                  })
                  break;
                default:
                  layer.bindTooltip("Moderate Confidence 7 - day mean temperatures in the <br> lower third of the historical range");
                  layer.setStyle({
                    fillColor: 'blue',
                    fillOpacity: .7,
                    color: 'white',
                    opacity: .7,
                    weight: 2,
                    dashArray: '3'
                  })
                  break;
              }
            });
          }


        // Checkbox functionality
        $("input[id=tropical-cyclone]").on('change', function() {
          // verify if week 1 or 2 is currenly checked
          var selectedWeek = $("input[name='global-tropics-map-duration']:checked").val()
          if(selectedWeek == 'week1'){
            if(this.checked) {
              globaltropicsmap.addLayer(week1TropicalCycloneLayer)
            }
            else {
              globaltropicsmap.removeLayer(week1TropicalCycloneLayer)
              globaltropicsmap.removeLayer(week2TropicalCycloneLayer)
            }
          }
          else {
            if(this.checked) {
              globaltropicsmap.addLayer(week2TropicalCycloneLayer)
            }
            else {
              globaltropicsmap.removeLayer(week1TropicalCycloneLayer)
              globaltropicsmap.removeLayer(week2TropicalCycloneLayer)
            }
          };
        });

        $("input[id=above-average-rainfall]").on('change', function() {
          // verify if week 1 or 2 is currenly checked
          var selectedWeek = $("input[name='global-tropics-map-duration']:checked").val()
          if(selectedWeek == 'week1'){
            if(this.checked) {
              globaltropicsmap.addLayer(week1UpperTercilePrecipLayer)
            }
            else {
              globaltropicsmap.removeLayer(week1UpperTercilePrecipLayer)
              globaltropicsmap.removeLayer(week2UpperTercilePrecipLayer)
            }
          }
          else {
            if(this.checked) {
              globaltropicsmap.addLayer(week2UpperTercilePrecipLayer)
            }
            else {
              globaltropicsmap.removeLayer(week1UpperTercilePrecipLayer)
              globaltropicsmap.removeLayer(week2UpperTercilePrecipLayer)
            }
          };
        });

        $("input[id=below-average-rainfall]").on('change', function() {
          // verify if week 1 or 2 is currenly checked
          var selectedWeek = $("input[name='global-tropics-map-duration']:checked").val()
          if(selectedWeek == 'week1'){
            if(this.checked) {
              globaltropicsmap.addLayer(week1LowerTercilePrecipLayer)
            }
            else {
              globaltropicsmap.removeLayer(week1LowerTercilePrecipLayer)
              globaltropicsmap.removeLayer(week2LowerTercilePrecipLayer)
            }
          }
          else {
            if(this.checked) {
              globaltropicsmap.addLayer(week2LowerTercilePrecipLayer)
            }
            else {
              globaltropicsmap.removeLayer(week1LowerTercilePrecipLayer)
              globaltropicsmap.removeLayer(week2LowerTercilePrecipLayer)
            }
          };
        });

        $("input[id=above-normal-temp]").on('change', function() {
          // verify if week 1 or 2 is currenly checked
          var selectedWeek = $("input[name='global-tropics-map-duration']:checked").val()
          if(selectedWeek == 'week1'){
            if(this.checked) {
              globaltropicsmap.addLayer(week1AboveNormalTempLayer)
            }
            else {
              globaltropicsmap.removeLayer(week1AboveNormalTempLayer)
              globaltropicsmap.removeLayer(week2AboveNormalTempLayer)
            }
          }
          else {
            if(this.checked) {
              globaltropicsmap.addLayer(week2AboveNormalTempLayer)
            }
            else {
              globaltropicsmap.removeLayer(week1AboveNormalTempLayer)
              globaltropicsmap.removeLayer(week2AboveNormalTempLayer)
            }
          };
        });

        $("input[id=below-normal-temp]").on('change', function() {
          // verify if week 1 or 2 is currenly checked
          var selectedWeek = $("input[name='global-tropics-map-duration']:checked").val()
          if(selectedWeek == 'week1'){
            if(this.checked) {
              globaltropicsmap.addLayer(week1BelowNormalTempLayer)
            }
            else {
              globaltropicsmap.removeLayer(week1BelowNormalTempLayer)
              globaltropicsmap.removeLayer(week2BelowNormalTempLayer)
            }
          }
          else {
            if(this.checked) {
              globaltropicsmap.addLayer(week2BelowNormalTempLayer)
            }
            else {
              globaltropicsmap.removeLayer(week1BelowNormalTempLayer)
              globaltropicsmap.removeLayer(week2BelowNormalTempLayer)
            }
          };
        });


        //switch all layers from Week 1 or Week 2
        $("input[name=global-tropics-map-duration").on('change', function() {

          //get the values of the check boxes
          var tropicalCycloneChecked = $('input[id=tropical-cyclone]:checked')[0];
          var aboveAverageRainfallChecked = $('input[id=above-average-rainfall]:checked')[0];
          var belowAverageRainfallChecked = $('input[id=below-average-rainfall]:checked')[0];
          var aboveNormalTempChecked = $('input[id=above-normal-temp]:checked')[0];
          var belowNormalTempChecked = $('input[id=below-normal-temp]:checked')[0];

          if(this.value == "week1"){

            //remove all week 2 layers
            globaltropicsmap.removeLayer(week2TropicalCycloneLayer);
            globaltropicsmap.removeLayer(week2UpperTercilePrecipLayer);
            globaltropicsmap.removeLayer(week2LowerTercilePrecipLayer);
            globaltropicsmap.removeLayer(week2AboveNormalTempLayer);
            globaltropicsmap.removeLayer(week2BelowNormalTempLayer);


            //update the valid and release dates
            $('#global-tropics-map-header .valid-dates').html("Valid: " + globalTropicsValidDateWeek1 + "<br> Released: " + globalTropicsReleaseDateWeek1);

            //add all week 1 layers that are still checked
            if (tropicalCycloneChecked){
              globaltropicsmap.addLayer(week1TropicalCycloneLayer);
            }
            if (aboveAverageRainfallChecked){
              globaltropicsmap.addLayer(week1UpperTercilePrecipLayer);
            }
            if (belowAverageRainfallChecked){
              globaltropicsmap.addLayer(week1LowerTercilePrecipLayer);
            }
            if (aboveNormalTempChecked){
              globaltropicsmap.addLayer(week1AboveNormalTempLayer);
            }
            if (belowNormalTempChecked){
              globaltropicsmap.addLayer(week1BelowNormalTempLayer);
            }
          }
          else {

            //remove all week 1 layers
            globaltropicsmap.removeLayer(week1TropicalCycloneLayer);
            globaltropicsmap.removeLayer(week1UpperTercilePrecipLayer);
            globaltropicsmap.removeLayer(week1LowerTercilePrecipLayer);
            globaltropicsmap.removeLayer(week1AboveNormalTempLayer);
            globaltropicsmap.removeLayer(week1BelowNormalTempLayer);


            //update the valid and release dates
            $('#global-tropics-map-header .valid-dates').html("Valid: " + globalTropicsValidDateWeek2 + "<br> Released: " + globalTropicsReleaseDateWeek2);

            //add all week 2 layers
            if (tropicalCycloneChecked){
               globaltropicsmap.addLayer(week2TropicalCycloneLayer);
            }
            if (aboveAverageRainfallChecked){
              globaltropicsmap.addLayer(week2UpperTercilePrecipLayer);
            }

            if (belowAverageRainfallChecked){
              globaltropicsmap.addLayer(week2LowerTercilePrecipLayer);
            }

            if (aboveNormalTempChecked){
              globaltropicsmap.addLayer(week2AboveNormalTempLayer);
            }

            if (belowNormalTempChecked){
              globaltropicsmap.addLayer(week2BelowNormalTempLayer);
            }
          }
        });

        // var globalTropicsSlider = $('#global-tropics-opacity-level')[0];
        // var globalTropicsOutput = $('.global-tropics-opacity-slider__value')[0];

        // // Convert opacity decimal value to percent
        // var percent = Math.round(globalTropicsSlider.value * 100);
        // // Write percent value in html label area
        // $('.global-tropics-opacity-slider__value').html(percent);

        // globalTropicsOutput.innerHTML = percent;
        // globalTropicsSlider.oninput = function() {
        //   globalTropicsOutput.innerHTML = Math.round(this.value * 100);



        //   week2UpperTercilePrecipLayer.layer.setStyle({
        //         fillOpacity: (globalTropicsSlider.value)
        //         });

        // }
        var globalTropicsSlider = $('#global-tropics-opacity-level')[0];
        var globalTropicsOutput = $('.global-tropics-opacity-slider__value')[0];

        // Convert opacity decimal value to percent
        var percent = Math.round(globalTropicsSlider.value * 100);
        // Write percent value in html label area
        $('.global-tropics-opacity-slider__value').html(percent);

        globalTropicsOutput.innerHTML = percent;
        globalTropicsSlider.oninput = function() {
          globalTropicsOutput.innerHTML = Math.round(this.value * 100);

          //Update the Opacity for all layers:
          week1TropicalCycloneLayer.eachLayer(function(layer){
            layer.setStyle({
              fillOpacity: (globalTropicsSlider.value)
            });
          });
          week1UpperTercilePrecipLayer.eachLayer(function(layer){
            layer.setStyle({
              fillOpacity: (globalTropicsSlider.value)
            });
          });
          week1UpperTercilePrecipLayer.eachLayer(function(layer){
            layer.setStyle({
              fillOpacity: (globalTropicsSlider.value)
            });
          });
          week1LowerTercilePrecipLayer.eachLayer(function(layer){
            layer.setStyle({
              fillOpacity: (globalTropicsSlider.value)
            });
          });
          week1AboveNormalTempLayer.eachLayer(function(layer){
            layer.setStyle({
              fillOpacity: (globalTropicsSlider.value)
            });
          });
          week1BelowNormalTempLayer.eachLayer(function(layer){
            layer.setStyle({
              fillOpacity: (globalTropicsSlider.value)
            });
          });

          week2TropicalCycloneLayer.eachLayer(function(layer){
            layer.setStyle({
              fillOpacity: (globalTropicsSlider.value)
            });
          });
          week2UpperTercilePrecipLayer.eachLayer(function(layer){
            layer.setStyle({
              fillOpacity: (globalTropicsSlider.value)
            });
          });
          week2UpperTercilePrecipLayer.eachLayer(function(layer){
            layer.setStyle({
              fillOpacity: (globalTropicsSlider.value)
            });
          });
          week2LowerTercilePrecipLayer.eachLayer(function(layer){
            layer.setStyle({
              fillOpacity: (globalTropicsSlider.value)
            });
          });
          week2AboveNormalTempLayer.eachLayer(function(layer){
            layer.setStyle({
              fillOpacity: (globalTropicsSlider.value)
            });
          });
          week2BelowNormalTempLayer.eachLayer(function(layer){
            layer.setStyle({
              fillOpacity: (globalTropicsSlider.value)
            });
          });
        }

      globaltropicsmap.invalidateSize();
  })(jQuery);
