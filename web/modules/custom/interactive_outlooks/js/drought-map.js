/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
  "use strict";

   //Drupal.behaviors.createDroughtMap = {
   	//attach:function (context, settings) {

   	  //$('#drought-outlooks-map', context).once('#drought-map', function() {

  		  // Create the map
        const droughtmap = L.map('drought-map', {
          center: [38, -96],
          zoomSnap: 0.1,
          zoom: 3.9,
          minZoom: 3.9
        });

        // Add Esri World Topo base map via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(droughtmap);

        //create Drought layers
        var monthlyDroughtLayer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_drought_outlk/MapServer/0'
        });
        var seasonalDroughtLayer = new L.esri.featureLayer({
          url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_drought_outlk/MapServer/1'
        });
        
        //Add initial layer to map
        monthlyDroughtLayer.addTo(droughtmap);

        seasonalDroughtLayer.addTo(droughtmap);
        seasonalDroughtLayer.removeFrom(droughtmap);

        var currentLayer = monthlyDroughtLayer;
        var previousLayer = "";
        currentLayer.on('load', iterateFeatures);

        var validmonth = "";
        var releasemonth = "";
        var seasonalstartdate = "";
        var seasonalenddate = "";
        var releaseseasonal = "";
        var develop;
        var improve;
        var persist;
        var remove;

        function iterateFeatures () {
          currentLayer.eachFeature(function(layer) {
            layer.setStyle({
               fillOpacity: 0.6
            });
            if (layer.feature.properties.fid_dev){
              layer.setStyle({
                color: '#FFDE63'
              })
              //add tooltip to map
              layer.bindTooltip("Drought development likely");
              // log that the layer has this category and we will need to show it in the legend
              develop = true;
            }
            if (layer.feature.properties.fid_improv){
              layer.setStyle({
                color: '#DED2BC'
              })
              //add tooltip to map
              layer.bindTooltip("Drought remains but improves");
              // log that the layer has this category and we will need to show it in the legend
              improve = true;
            }
            if (layer.feature.properties.fid_persis){
              layer.setStyle({
                color: '#9B634A'
              })
              //add tooltip to map
              layer.bindTooltip("Drought persists");
              // log that the layer has this category and we will need to show it in the legend
              persist = true;
            }
            if (layer.feature.properties.fid_remove){
              layer.setStyle({
                color: '#B2AD69'
              })
              //add tooltip to map
              layer.bindTooltip("Drought removal likely");
              // log that the layer has this category and we will need to show it in the legend
              remove = true;
            }


            //hide the legend item if there are no layers for that item
          if (!develop){
            $('.development').hide();
          }
          if(!improve){
            $('.improves').hide();
          }
          if(!persist){
            $('.persists').hide();
          }
          if(!remove){
            $('.removal').hide();
          }

            
          });
        }

        monthlyDroughtLayer.query()
          .run(function(error, featureCollection){
          validmonth = featureCollection.features[0].properties.start_date;
          releasemonth = featureCollection.features[0].properties.fcst_date;

          // Set initial title and valid period for monthly drought outlook
          $('#drought-map-header .title').text("U.S. Monthly Drought Outlook");
          $('#drought-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
        });

        seasonalDroughtLayer.query()
          .run(function(error, featureCollection){
          seasonalstartdate = featureCollection.features[0].properties.fcst_date;
          seasonalenddate = featureCollection.features[0].properties.target;
          releaseseasonal = featureCollection.features[0].properties.fcst_date;

          ///set the colors of the layers
          seasonalDroughtLayer.eachFeature(function(layer){
            if (layer.feature.properties.fid_dev){
              layer.setStyle({
                color: '#FFDE63'
              })
              //add tooltip to map
              layer.bindTooltip("Drought development likely");
              // log that the layer has this category and we will need to show it in the legend
              develop = true;
            }
            if (layer.feature.properties.fid_improv){
              layer.setStyle({
                color: '#DED2BC'
              })
              layer.bindTooltip("Drought remains but improves");
              // log that the layer has this category and we will need to show it in the legend
              improve = true;
            }
            if (layer.feature.properties.fid_persis){
              layer.setStyle({
                color: '#9B634A'
              })
              //add tooltip to map
              layer.bindTooltip("Drought persists");
              // log that the layer has this category and we will need to show it in the legend
              persist = true;
            }
            if (layer.feature.properties.fid_remove){
              layer.setStyle({
                color: '#B2AD69'
              })
              //add tooltip to map
              layer.bindTooltip("Drought removal likely");
              // log that the layer has this category and we will need to show it in the legend
              remove = true;
            }
          });

          //hide the legend item if there are no layers for that item
          if (!develop){
            $('.development').hide();
          }
          if(!improve){
            $('.improves').hide();
          }
          if(!persist){
            $('.persists').hide();
          }
          if(!remove){
            $('.removal').hide();
          }
        });


        var monthlyChecked = $('#drought-map__view-select input[type=radio][id=monthly]:checked');
        var seasonalChecked = $('#drought-map__view-select input[type=radio][id=seasonal]:checked');

        if (monthlyChecked) {
          $('.drought-image li a').attr({href: "https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png", target: "_blank"});
        } else if (seasonalChecked) {
          $('.drought-image li a').attr({href: "https://www.cpc.ncep.noaa.gov/products/expert_assessment/season_drought.png", target: "_blank"});
        }

        //change the layers of the map to Monthly or Seasonal based on selected radio button
        $('input[name=drought-map-duration]').on('change', function() {
          if (this.value == 'monthly') {
           seasonalDroughtLayer.removeFrom(droughtmap);
           currentLayer = seasonalDroughtLayer;
           monthlyDroughtLayer.addTo(droughtmap);
           $('#drought-map-header .title').text("U.S. Monthly Drought Outlook");
           $('#drought-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.drought-image li a').attr({href: "https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png", target: "_blank"});
          }
          else if (this.value == 'seasonal') {
           monthlyDroughtLayer.removeFrom(droughtmap);
           currentLayer.addTo(droughtmap);
           currentLayer.on('load', iterateFeatures);
          //  seasonalDroughtLayer.addTo(droughtmap);
           $('#drought-map-header .title').text("U.S. Seasonal Drought Outlook");
           $('#drought-map-header .valid-dates').text("Valid for " + seasonalstartdate + " - " + seasonalenddate + ", Released " + releaseseasonal);
           $('.drought-image li a').attr({href: "https://www.cpc.ncep.noaa.gov/products/expert_assessment/season_drought.png", target: "_blank"});
          }
        });


        // Function to remove any existing layers
        function removePrevLayer() {
          if (droughtmap.hasLayer(currentLayer)) {
            droughtmap.removeLayer(currentLayer);
          }
        };

        //change the map to the correct area
        $('input[type=radio][name=drought-map-view]').on('change',function() {
          if (this.value == 'conus') {
            droughtmap.setView(new L.LatLng(38, -96), 3.9)
          }
          else if (this.value == 'alaska') {
            droughtmap.setView(new L.LatLng(64.2,-149.4), 3.9)
          }
        });

        var droughtSlider = $('#drought-opacity-level')[0];
        // var output = document.getElementById("sliderValue");
        var droughtOutput = $('.drought-opacity-slider__value')[0];

        var opacityVal = $('.drought-opacity-slider__range').val();
        // Convert opacity decimal value to percent
        var percent = Math.round(droughtSlider.value * 100);
        // Write percent value in html label area
        $('.drought-opacity-slider__value').html(percent);

        droughtOutput.innerHTML = percent;
        droughtSlider.oninput = function() {
          droughtOutput.innerHTML = Math.round(this.value * 100);

          currentLayer.eachFeature(function(layer){
            layer.setStyle({
              fillOpacity: (droughtSlider.value)
            });
          });
        }

        
     droughtmap.invalidateSize();
     //export { droughtmap };


    //  }); // .once
  //  } // attach
  //}; // behaviors

})(jQuery);
