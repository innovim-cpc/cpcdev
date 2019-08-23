/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
  "use strict";

  // Drupal.behaviors.createDroughtMap = {
  // 	attach:function (context, settings) {
  //
  // 	  $('#drought-outlooks-map', context).once('drought-outlooks-map', function() {
  		  // Create the map
        var droughtmap = L.map('drought-map', {
          center: [38, -96],
          zoom: 4,
          minZoom: 4
        });

        // Add Esri World Topo base map via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(droughtmap);
        
        // Get link to layer data
        const monthlyDrought = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_drought_outlk/MapServer/0/";
        const seasonalDrought = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_drought_outlk/MapServer/1/";
        
        // create monhtly drought layer
        var monthlyDroughtLayer = new L.esri.featureLayer({
          url: monthlyDrought
        });
        
        //create seasonal drought layer
        var seasonalDroughtLayer = new L.esri.featureLayer({
         url: seasonalDrought
        });
        
        //Add layer to map
        monthlyDroughtLayer.addTo(droughtmap);
        //Add seasonal map on load (then remove it) or the layer styles won't be applied
        seasonalDroughtLayer.addTo(droughtmap);
        seasonalDroughtLayer.removeFrom(droughtmap);
        
        
        // monthlyDroughtLayer.on('mouse-over', function(e) {
        //   if (droughtmap) {
        //     layerPopup = L.popup()
        //     .setContent('Popup for' + e.layer.feature.properties.name)
        //     .openOn(droughtmap);
        //   }
        // });
        // 
        // monthlyDroughtLayer.on('mouse-out', function(e) {
        //   if (layerPopup && droughtmap) {
        //     map.closePopup(layerPopup);
        //     layerPopup = null;
        //   }
        // });
        
        
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
          $('#valid-dates').text("Valid for " + validmonth + "  Released " + releasemonth);       
                              
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
          
          //build the legend
          //loop through all the features to see which items we need to show
          // for (var i = 0; i < featureCollection.features.length; i++) {
          //   if (featureCollection.features[i].properties.fid_dev){
          //     develop = true;            
          //   }
          //   if (featureCollection.features[i].properties.fid_improv){
          //     improve = true;            
          //   }
          //   if (featureCollection.features[i].properties.fid_persis){
          //     persist = true;            
          //   }
          //   if (featureCollection.features[i].properties.fid_remove){
          //     remove = true;
          //   }
          // }
          //hide the legend item if there are no layers for that item
          if (!develop){
            $('#develop').hide();
          }
          if(!improve){
            $('#improve').hide();
          }
          if(!persist){
            $('#persist').hide();
          }
          if(!remove){
            $('#remove').hide();
          }          
          });
        
        //show info when a
        
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
          
          
            //build the legend
            //loop through all the features to see which items we need to show
            // for (var i = 0; i < featureCollection.features.length; i++) {
            //   if (featureCollection.features[i].properties.fid_dev){
            //     develop = true;            
            //   }
            //   if (featureCollection.features[i].properties.fid_improv){
            //     improve = true;            
            //   }
            //   if (featureCollection.features[i].properties.fid_persis){
            //     persist = true;            
            //   }
            //   if (featureCollection.features[i].properties.fid_remove){
            //     remove = true;
            //   }
            // }
            //hide the legend item if there are no layers for that item
            if (!develop){
              $('#develop').hide();
            }
            if(!improve){
              $('#improve').hide();
            }
            if(!persist){
              $('#persist').hide();
            }
            if(!remove){
              $('#remove').hide();
            }    
        });
        
        //change the layers of the map to Monthly or Seasonal based on the dropdown list
        $('input[name=drought-map-duration]').on('change', function() {
             if (this.value == 'monthly') {
               seasonalDroughtLayer.removeFrom(droughtmap);
               monthlyDroughtLayer.addTo(droughtmap); 
               $('#title').text("U.S. Monthly Drought Outlook");
               $('#valid-dates').text("Valid for " + validmonth + "  Released " + releasemonth);
                          
             }
             else if (this.value == 'seasonal') {
               monthlyDroughtLayer.removeFrom(droughtmap);
               seasonalDroughtLayer.addTo(droughtmap);
               $('#title').text("U.S. Seasonal Drought Outlook");
               $('#valid-dates').text("Valid for " + seasonalstartdate + " - " + seasonalenddate + "  Released " + releaseseasonal);
             }               
             
        });


        //change the map to the correct area
        $('input[type=radio][name=drought-map-view]').on('change',function() {
            if (this.value == 'conus') {
              droughtmap.setView(new L.LatLng(38, -96), 4)
            }
            else if (this.value == 'alaska') {
              droughtmap.setView(new L.LatLng(64.2,-149.4), 4)
            }
        });

})(jQuery);
