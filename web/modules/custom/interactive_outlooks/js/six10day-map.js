/**
 * @file
 * Build the map(s)
 *
 */
(function ($) {
  "use strict";

   //Drupal.behaviors.createsix10dayMap = {
   	//attach:function (context, settings) {

   	  //$('#six10day-outlooks-map', context).once('#six10day-map', function() {

  		  // Create the map
        var six10daymap = L.map('six10day-map', {
          center: [38, -96],
          zoomSnap: 0.1,
          zoom: 3.9,
          minZoom: 3.9
        });

        // Add Esri World Topo base map via Esri Leaflet plugin
        L.esri.basemapLayer('Topographic').addTo(six10daymap);

        // Get link to layer data
        const temp = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/0/";
        const precip = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_6_10_day_outlk/MapServer/1/";
        
        // create monhtly drought layer
        var tempLayer = new L.esri.featureLayer({
          url: temp
        });
        
        //create precip drought layer
        var precipLayer = new L.esri.featureLayer({
         url: precip
        });

        //Add initial layer to map
        tempLayer.addTo(six10daymap);
        
        //Add precip map on load (then remove it) or the layer styles won't be applied
        precipLayer.addTo(six10daymap);
        precipLayer.removeFrom(six10daymap);
        
        
        var validmonth = "";
        var releasemonth = "";
        var develop;
        var improve;
        var persist;
        var remove;
        
        tempLayer.query()
          .run(function(error, featureCollection){
            console.log(featureCollection);
          validmonth = featureCollection.features[0].properties.end_date;
          releasemonth = featureCollection.features[0].properties.fcst_date;
          // Set initial title and valid period for monthly drought outlook
          $('#six10day-map-header .title').text("U.S. 6 to 10 Day Temperature Outlook");
          $('#six10day-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);

          ///set the colors of the layers
          tempLayer.eachFeature(function(layer){            
          
            layer.setStyle({
              fillOpacity: .4, 
              color: '#6E6E6E',
              opacity: .3,
              weight: 1              
            });
            
            if (layer.feature.properties.cat == "Above"){
              //get probability of the layer
              switch(layer.feature.properties.prob){
                case 90:
                  layer.setStyle({
                    fillColor: '#622228',                   
                  })
                  layer.bindTooltip("90% chance of Above Average Temperature");
                  break;
                case 80:
                  layer.setStyle({
                    fillColor: '#8A2F38'
                  })
                  layer.bindTooltip("80% chance of Above Average Temperature");
                  break;
                case 70:
                  layer.setStyle({
                    fillColor: '#CC3047'
                  })
                  layer.bindTooltip("70% chance of Above Average Temperature");
                  break;
                case 60:
                    layer.setStyle({
                      fillColor: '#C72F29'
                    })
                    layer.bindTooltip("60% chance of Above Average Temperature");
                    break;
                case 50:
                    layer.setStyle({
                      fillColor: '#DA5731'
                    })
                    layer.bindTooltip("50% chance of Above Average Temperature");
                    break;
                case 40:
                  layer.setStyle({
                    fillColor: '#E38B4B'
                  })
                  layer.bindTooltip("40% chance of Above Average Temperature");
                  break;
                case 33:
                  layer.setStyle({
                    fillColor: '#E7B168'
                  })
                  layer.bindTooltip("33% chance of Above Average Temperature");
                  break;
              }                         
            
            }
            else if (layer.feature.properties.cat == "Normal"){            
                  layer.setStyle({
                    fillColor: '#A0A0A0'
                  })
                  layer.bindTooltip("36% chance of Normal Temperature");
            }
            else if (layer.feature.properties.cat == "Below"){
              switch(layer.feature.properties.prob){
                case 33:
                  layer.setStyle({
                    fillColor: '#BFCBE4'
                  })
                  layer.bindTooltip("33% chance of Below Average Temperature");
                  break;  
                case 40:
                  layer.setStyle({
                    fillColor: '#A0C0DF'
                  })
                  layer.bindTooltip("40% chance of Below Average Temperature");
                  break;
                case 50:
                  layer.setStyle({
                    fillColor: '#77B5E2'
                  })
                  layer.bindTooltip("50% chance of Below Average Temperature");
                  break;  
                case 60:
                  layer.setStyle({
                    fillColor: '#389FDC'
                  })
                  layer.bindTooltip("60% chance of Below Average Temperature");
                  break;  
                case 70:
                  layer.setStyle({
                    fillColor: '#005DA1'
                  })
                  layer.bindTooltip("70% chance of Below Average Temperature");
                  break;
                case 80:
                  layer.setStyle({
                    fillColor: '#2E216F'
                  })
                  layer.bindTooltip("80% chance of Below Average Temperature");
                  break;
                case 90:
                  layer.setStyle({
                    fillColor: '#221852'
                  })
                  layer.bindTooltip("90% chance of Below Average Temperature");
                  break;      
              }
            }
                        
          });

          //hide the legend item if there are no layers for that item
          if (!develop){
            $('.development').hide();
          }          
        });
        
        
        var tempChecked = $('#six10day-map__view-select input[type=radio][id=temp]:checked');
        var precipChecked = $('#six10day-map__view-select input[type=radio][id=precip]:checked');
        
        if (tempChecked) {
          $('.six10day-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
        } else if (precipChecked) {
          $('.six10day-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/season_drought.png');
        }
        
        //change the layers of the map to Monthly or precip based on the dropdown list
        $('input[name=six10day-map-category]').on('change', function() {
          if (this.value == 'temp') {
           precipLayer.removeFrom(six10daymap);
           tempLayer.addTo(six10daymap);
           $('#six10day-map-header .title').text("U.S. 6 to 10 Day Temperature Outlook");
           $('#six10day-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.six10day-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png');
          }
          else if (this.value == 'precip') {
           tempLayer.removeFrom(six10daymap);
           precipLayer.addTo(six10daymap);
           $('#six10day-map-header .title').text("U.S. 6 to 10 Day Precipitation Outlook");
           $('#six10day-map-header .valid-dates').text("Valid for " + validmonth + ", Released " + releasemonth);
           $('.six10day-image li a').attr('href', 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/season_drought.png');
          }
        });
        
        //change the map to the correct area
        $('input[type=radio][name=six10day-map-view]').on('change',function() {
          if (this.value == 'conus') {
            six10daymap.setView(new L.LatLng(38, -96), 3.9)
          }
          else if (this.value == 'alaska') {
            six10daymap.setView(new L.LatLng(64.2,-149.4), 3.9)
          }
        });
        
        var slider = $('#myRange')[0];
        // var output = document.getElementById("sliderValue");
        var output = $('#sliderValue')[0];
        output.innerHTML = slider.value;
        
        slider.oninput = function() {
          output.innerHTML = this.value;
          
          tempLayer.eachFeature(function(layer){                      
            layer.setStyle({
              fillOpacity: (slider.value / 120)              
            });
          });
        }



    //  }); // .once
  //  } // attach
  //}; // behaviors

})(jQuery);
