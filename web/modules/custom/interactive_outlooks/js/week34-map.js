/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
    "use strict";

      //Create the map
      const week34map = L.map('week34-map', {
        center: [38, -96],
        zoomSnap: 0.1,
        zoom: 3.9,
        minZoom: 3.9
      });

      // Add Esri World Topo basemap via Esri Leaflet plugin
      L.esri.basemapLayer('Topographic').addTo(week34map);


      $('#week34-map-header .title').text("U.S. Week 3 - 4 Outlooks");
      $('#week34-map-header .valid-dates').html("<br><br>  ");

      // Get link to  KML files
      const week34Tempkml = "http://www.cpc.ncep.noaa.gov/products/predictions/WK34/gis_files/wk34temp_latest.kml";
      const week34Precipkml = "http://www.cpc.ncep.noaa.gov/products/predictions/WK34/gis_files/wk34prcp_latest.kml";

      // We need to use the direct URL to the KML files (instead of downloading them to a directory in our module) because they're automatically updated. Using the direct URL produces errors on a development site, however, so we have to append it to a proxy URL
      const proxyurl = "https://cors-anywhere.herokuapp.com/";

      // Create the layers based on the URL and proxy URL
      var week34TempLayer = omnivore.kml((proxyurl + week34Tempkml));
      var week34PrecipLayer = omnivore.kml((proxyurl + week34Precipkml));

      //add layers to map
      week34map.addLayer(week34TempLayer);
      console.log(week34PrecipLayer);
      //week34map.addLayer(week34PrecipLayer);


      $.ajax({
        type     : "GET",
        url      : proxyurl + week34Tempkml,
        dataType : "xml",
        success  : getDataWeek34Tempkml,
        error    : function(){
          console.log("Could not retrieve XML file.");
        }
      });


    function getDataWeek34Tempkml(xml) {
      const dateInfo = $(xml).find("Document").first().attr("id");
      const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));

      week34TempLayer.eachLayer(function(layer){         
        switch(layer.feature.properties.name){
          case "50 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("50% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "55 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("55% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "60 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("60% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "65 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("65% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "70 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("70% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "75 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("75% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "80 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("80% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "85 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("85% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "90 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("90% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "95 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("95% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "100 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("100% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;


            case "50 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("50% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "55 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("55% Chance of Temperature Below Above Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "60 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("60% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "65 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("65% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "70 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("70% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "75 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("75% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "80 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("80% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "85 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("85% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "90 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("90% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "95 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("95% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "100 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("100% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
        }
      });
    }

    $.ajax({
      type     : "GET",
      url      : proxyurl + week34Precipkml,
      dataType : "xml",
      success  : getDataWeek34Precipkml,
      error    : function(){
        console.log("Could not retrieve XML file.");
      }
    });


    function getDataWeek34Precipkml(xml) {
      const dateInfo = $(xml).find("Document").first().attr("id");
      const noHazards = dateInfo.substring(dateInfo.indexOf("No_Hazards_Posted"));

      week34PrecipLayer.eachLayer(function(layer){         
        switch(layer.feature.properties.name){
          case "50 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("50% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "55 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("55% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "60 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("60% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "65 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("65% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "70 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("70% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "75 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("75% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "80 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("80% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "85 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("85% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "90 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("90% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "95 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("95% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "100 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("100% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;


            case "50 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("50% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "55 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("55% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "60 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("60% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "65 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("65% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "70 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("70% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "75 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("75% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "80 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("80% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "85 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("85% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "90 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("90% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "95 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("95% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "100 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("100% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
        }
      });
    }


    $('input[type=radio][name=week34-probability]').on('change',function() {
    if (this.value == 'temp-probability') {
      //show temperature probability
      week34map.removeLayer(week34PrecipLayer);
      week34map.addLayer(week34TempLayer);
      
    }
    else if (this.value == 'precip-probability') {
        //show precipitation probability
        week34map.removeLayer(week34TempLayer);
        week34map.addLayer(week34PrecipLayer);
    }
  });



  week34map.invalidateSize();
  })(jQuery);
