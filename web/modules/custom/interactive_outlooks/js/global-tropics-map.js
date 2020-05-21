/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
    "use strict";

          //Create the map
          const globaltropicsmap = L.map('global-tropics-map', {
            center: [38, -96],
            zoomSnap: 0.1,
            zoom: 1.0
          });
  
          // Add Esri World Topo base map via Esri Leaflet plugin
          L.esri.basemapLayer('Gray').addTo(globaltropicsmap);

          $('#global-tropics-map-header .title').text("U.S. Global Tropics Hazards Outlooks - Week 1");
          $('#global-tropics-map-header .valid-dates').html("Valid: "  + "<br> Released: ");

        // Get link to 8-14 day KML files found at https://www.cpc.ncep.noaa.gov/products/predictions/threats/threats.php
        const week1TropicalCyclonekml = "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/ghazards/KMZs/TC_WK1.kml";
        const week1UpperTercilePrecipkml = "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/ghazards/KMZs/WET_WK1.kml";


        // We need to use the direct URL to the KML files (instead of downloading them to a directory in our module) because they're automatically updated. Using the direct URL produces errors on a development site, however, so we have to append it to a proxy URL
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        // Create the layers based on the URL and proxy URL
        var week1TropicalCycloneLayer = omnivore.kml((proxyurl + week1TropicalCyclonekml));
        var week1UpperTercilePrecipLayer = omnivore.kml((proxyurl + week1UpperTercilePrecipkml));


         // Add the layers to the map
         globaltropicsmap.addLayer(week1TropicalCycloneLayer);
         globaltropicsmap.addLayer(week1UpperTercilePrecipLayer);


         $.ajax({
            type     : "GET",
            url      : proxyurl + week1UpperTercilePrecipkml,
            dataType : "xml",
            success  : getDataWeek1UpperTercilePrecipkml,
            error    : function(){
              console.log("Could not retrieve XML file.");
            }
          });


          function getDataWeek1UpperTercilePrecipkml(xml) {
            const dateInfo = $(xml).find("Document").first().attr("id");
            const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));
  
            week1UpperTercilePrecipLayer.eachLayer(function(layer){
              //layer.bindPopup(layer.feature.properties.description);
              //console.log(layer);
              switch(layer.feature.properties.name){
                case "0":
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
              }
            });
  
          }



       globaltropicsmap.invalidateSize();
  })(jQuery);