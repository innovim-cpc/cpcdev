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
        var droughtmap = L.map('drought-map', {
          center: [38, -96],
          zoomSnap: 0.1,
          zoom: 3.9,
          minZoom: 3.9
        });

        // Add Esri World Topo base map via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(droughtmap);

        // Get link to layer data
        var monthlyDrought = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_drought_outlk/MapServer/0";
        var seasonalDrought = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_drought_outlk/MapServer/1/";

        // create monthly drought layer
        var monthlyDroughtLayer = L.esri.featureLayer({
          url: monthlyDrought
        });
        console.log(monthlyDroughtLayer.fcst_date);

        // create seasonal drought layer
        var seasonalDroughtLayer = L.esri.featureLayer({
         url: seasonalDrought
        });

        //Add initial layer to map
        monthlyDroughtLayer.addTo(droughtmap);

        //Add seasonal map on load (then remove it) or the layer styles won't be applied
        seasonalDroughtLayer.addTo(droughtmap);
        seasonalDroughtLayer.removeFrom(droughtmap);

        var validmonth = "";
        var releasemonth = "";
        var seasonalstartdate = "";
        var seasonalenddate = "";
        var releaseseasonal = "";
        var develop;
        var improve;
        var persist;
        var remove;

        monthlyDroughtLayer.query()
          .run(function(error, featureCollection){
          validmonth = featureCollection.features[0].properties.target;
          releasemonth = featureCollection.features[0].properties.fcst_date;
          // Set initial title and valid period for monthly drought outlook
          $('#drought-map-header .title').text("U.S. Monthly Drought Outlook");
          $('#drought-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);

          ///set the colors of the layers
          monthlyDroughtLayer.eachFeature(function(layer){
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
           monthlyDroughtLayer.addTo(droughtmap);
           $('#drought-map-header .title').text("U.S. Monthly Drought Outlook");
           $('#drought-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.drought-image li a').attr({href: "https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png", target: "_blank"});
          }
          else if (this.value == 'seasonal') {
           monthlyDroughtLayer.removeFrom(droughtmap);
           seasonalDroughtLayer.addTo(droughtmap);
           $('#drought-map-header .title').text("U.S. Seasonal Drought Outlook");
           $('#drought-map-header .valid-dates').text("Valid for " + seasonalstartdate + " - " + seasonalenddate + ", Released " + releaseseasonal);
           $('.drought-image li a').attr({href: "https://www.cpc.ncep.noaa.gov/products/expert_assessment/season_drought.png", target: "_blank"});
          }
        });

        //change the map to the correct area
        $('input[type=radio][name=drought-map-view]').on('change',function() {
          if (this.value == 'conus') {
            droughtmap.setView(new L.LatLng(38, -96), 3.9)
          }
          else if (this.value == 'alaska') {
            droughtmap.setView(new L.LatLng(64.2,-149.4), 3.9)
          }
        });

        droughtmap.invalidateSize();

        //export { droughtmap };

    //  }); // .once
  //  } // attach
  //}; // behaviors

})(jQuery);
