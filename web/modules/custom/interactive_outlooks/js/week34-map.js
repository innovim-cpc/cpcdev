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
      L.esri.basemapLayer('Gray').addTo(week34map);

      // Get URL to place boundaries layer
      const boundariesUrl = 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/';

      // Create a map pane for the boundaries
      week34map.createPane('boundaries');

      // Define the boundaries pane when creating the dynamicMapLayer
      L.esri.dynamicMapLayer({
        url: boundariesUrl,
        pane: 'boundaries',
        opacity: 0.25
      }).addTo(week34map);

      // Get URL to place cities layer
      const citiesUrl = 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/';

      // Create a map pane for the city labels
      week34map.createPane('cities');

      week34map.getPane('cities').style.pointerEvents = 'none';

      // Define the cities pane when creating the dynamicMapLayer
      L.esri.dynamicMapLayer({
        url: citiesUrl,
        pane: 'cities',
        opacity: 0.75
      }).addTo(week34map);

      // Create a map pane for the outlooks
      week34map.createPane('outlooks');

      week34map.getPane('outlooks').style.zIndex = 650;

      // Get link to KML files
      const week34Tempkml = "http://www.cpc.ncep.noaa.gov/products/predictions/WK34/gis_files/wk34temp_latest.kml";
      const week34Precipkml = "http://www.cpc.ncep.noaa.gov/products/predictions/WK34/gis_files/wk34prcp_latest.kml";

      // We need to use the direct URL to the KML files (instead of downloading them to a directory in our module) because they're automatically updated. Using the direct URL produces errors on a development site, however, so we have to append it to a proxy URL
      const proxyurl = "https://cors-anywhere.herokuapp.com/";

      // Create the layers based on the URL and proxy URL
      var week34TempLayer = omnivore.kml(proxyurl + week34Tempkml);
      var week34PrecipLayer = omnivore.kml(proxyurl + week34Precipkml);

      // Add layers to map
      week34map.addLayer(week34TempLayer);
      var currentLayer = week34TempLayer;

      var tempValidDate;
      var tempReleaseDate;
      var precipValidDate;
      var precipReleaseDate

      $('#week34-map-header .title').text("U.S. Week 3 - 4 Outlooks");
      $('#week34-map-header .valid-dates').html("Valid: <br>Released: ");

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
      var tempValidStartDateString = new Date(dateInfo.substring(57,67));
      var tempValidEndDateString = new Date(dateInfo.substring(67));

      var tempReleaseDateString = new Date(dateInfo.substring(39,49));

      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      tempValidDate = tempValidStartDateString.toLocaleDateString("en-US", options) + ' - ' + tempValidEndDateString.toLocaleDateString("en-US", options);
      tempReleaseDate = tempReleaseDateString.toLocaleDateString("en-US", options);

      $('#week34-map-header .valid-dates').html("Valid: " + tempValidDate + "<br> Released: " + tempReleaseDate);

      week34TempLayer.eachLayer(function(layer){
        switch(layer.feature.properties.name){
          case "50 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("50% - 55% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "55 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("55% - 60% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "60 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("60% - 70% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "70 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("70% - 80% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "80 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("80% - 90% Chance of Temperature Being Above Normal");
            layer.setStyle({
              fillColor: 'red',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "90 Percent Chance of Temperature Being Above Normal":
            layer.bindTooltip("90% - 100% Chance of Temperature Being Above Normal");
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
            layer.bindTooltip("50% - 55% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "55 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("55% - 60% Chance of Temperature Below Above Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "60 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("60% - 70% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "70 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("70% - 80% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "80 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("80% - 90% Chance of Temperature Being Below Normal");
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "90 Percent Chance of Temperature Being Below Normal":
            layer.bindTooltip("90% - 100% Chance of Temperature Being Below Normal");
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
      var precipValidStartDateString = new Date(dateInfo.substring(59,69));
      var precipValidEndDateString = new Date(dateInfo.substring(69));

      var precipReleaseDateString = new Date(dateInfo.substring(41,51));

      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      precipValidDate = precipValidStartDateString.toLocaleDateString("en-US", options) + ' - ' + precipValidEndDateString.toLocaleDateString("en-US", options);
      precipReleaseDate = precipReleaseDateString.toLocaleDateString("en-US", options);

      week34PrecipLayer.eachLayer(function(layer){
        switch(layer.feature.properties.name){
          case "50 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("50% - 55% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "55 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("55% - 60% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "60 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("60% - 65% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "65 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("65% - 70% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "70 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("70% - 75% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "75 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("75% - 80% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "80 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("80% - 85% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "85 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("85% - 90% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "90 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("90% - 95% Chance of Precipitation Being Above Normal");
            layer.setStyle({
              fillColor: 'green',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "95 Percent Chance of Precipitation Being Above Normal":
            layer.bindTooltip("95% - 100% Chance of Precipitation Being Above Normal");
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
            layer.bindTooltip("50% - 55% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
          case "55 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("55% - 60% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "60 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("60% - 65% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "65 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("65% - 70% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "70 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("70% - 75% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "75 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("75% - 80% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "80 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("80% - 85% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "85 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("85% - 90% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "90 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("90% - 95% Chance of Precipitation Being Below Normal");
            layer.setStyle({
              fillColor: 'tan',
              fillOpacity: .7,
              color: 'black',
              opacity: .7,
              weight: 1,
            })
            break;
            case "95 Percent Chance of Precipitation Being Below Normal":
            layer.bindTooltip("95% - 100% Chance of Precipitation Being Below Normal");
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
      currentLayer = week34TempLayer;
      $('#week34-map-header .valid-dates').html("Valid: " + tempValidDate + "<br> Released: " + tempReleaseDate);

    }
    else if (this.value == 'precip-probability') {
        //show precipitation probability
        week34map.removeLayer(week34TempLayer);
        week34map.addLayer(week34PrecipLayer);
        currentLayer = week34PrecipLayer;
        $('#week34-map-header .valid-dates').html("Valid: " + precipValidDate + "<br> Released: " + precipReleaseDate);
    }
  });

    //change the map to the correct area
    $('input[type=radio][name=week34-map-view]').on('change',function() {
      if (this.value == 'conus') {
        week34map.setView(new L.LatLng(38, -96), 3.9)
      }
      else if (this.value == 'alaska') {
        week34map.setView(new L.LatLng(64.2,-149.4), 3.9)
      }
    });

    var week34Slider = $('#week34-opacity-level')[0];
    var week34Output = $('.week34-opacity-slider__value')[0];

    // Convert opacity decimal value to percent
    var percent = Math.round(week34Slider.value * 100);
    // Write percent value in html label area
    $('.week34-opacity-slider__value').html(percent);

    week34Output.innerHTML = percent;
    week34Slider.oninput = function() {
      week34Output.innerHTML = Math.round(this.value * 100);

      currentLayer.eachLayer(function(layer){
        layer.setStyle({
          fillOpacity: (week34Slider.value)
        });
      });
    }

  week34map.invalidateSize();

  })(jQuery);
