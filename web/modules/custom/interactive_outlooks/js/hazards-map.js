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
        var hazardsmap = L.map('hazards-map', {
          center: [38, -96],
          zoom: 4,
          minZoom: 3.6
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
        L.esri.basemapLayer('Topographic').addTo(hazardsmap);

        // Get link to 8-14 day KML files found at https://www.cpc.ncep.noaa.gov/products/predictions/threats/threats.php
        const prcp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/prcp_D8_14.kml";
        const temp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/temp_D8_14.kml";
        // const excessHeat814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/excess_heat_D8_14.kml";
        const wind814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/wind_D8_14.kml";
        const probPrcp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/prcp_prob_D8_14.kml";
        const probExcessHeat814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/excess_heat_prob_D8_14.kml";
        const probTemp814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/temp_prob_D8_14.kml";
        const probWind814kml = "https://www.cpc.ncep.noaa.gov/products/predictions/threats/wind_prob_D8_14.kml";

        // We need to use the direct URL to the KML files (instead of downloading them to a directory in our module) because they're automatically updated. Using the direct URL produces errors on a development site, however, so we have to append it to a proxy URL
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        // Create the layers based on the URL and proxy URL
        var prcp814kmlLayer = new L.KML(proxyurl + prcp814kml, {async: true});
        var temp814kmlLayer = new L.KML(proxyurl + temp814kml, {async: true});
        // var excessHeat814kmlLayer = new L.KML(proxyurl + excessHeat814kml, {async: true});
        var wind814kmlLayer = new L.KML(proxyurl + wind814kml, {async: true});
        var probPrcp814kmlLayer = new L.KML(proxyurl + probPrcp814kml, {async: true});
        var probExcessHeat814kmlLayer = new L.KML(proxyurl + probExcessHeat814kml, {async: true});
        var probTemp814kmlLayer = new L.KML(proxyurl + probTemp814kml, {async: true});
        var probWind814kmlLayer = new L.KML(proxyurl + probWind814kml, {async: true});

        // Add the layers to the map
        hazardsmap.addLayer(prcp814kmlLayer);
        hazardsmap.addLayer(temp814kmlLayer);
        // hazardsmap.addLayer(excessHeat814kmlLayer);
        hazardsmap.addLayer(wind814kmlLayer);
        hazardsmap.addLayer(probPrcp814kmlLayer);
        hazardsmap.addLayer(probExcessHeat814kmlLayer);
        hazardsmap.addLayer(probTemp814kmlLayer);        
        hazardsmap.addLayer(probWind814kmlLayer);
        
        
        
                
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
          
          // temp814kmlLayer.eachLayer(function(layer){
          //   if (layer.options.fillColor === "#a80000") {
          //     layer.bindPopup("High Risk of Excessive Heat");
          //   }
          //   // layer.bindPopup(layer.options.id);
          //   // console.log(layer.options.fillColor);
          //   // console.log(layer);
          // });      
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
          
          // probPrcp814kmlLayer.eachLayer(function(layer){            
          //   if (layer.options.fillColor === "#a80000") {
          // 
          //     layer.bindPopup("High Risk of Excessive Heat");
          //   }
          //   layer.bindPopup("Slight Risk of Heavy Precipitation");
          //   // layer.bindPopup(layer.options.id);
          //   // console.log(layer.options.fillColor);
          //   // console.log(layer);
          // });      
          
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
          const dateInfo = $(xml).find("Document").first().attr("id");
          const validDates = dateInfo.substring(dateInfo.indexOf("Valid"));
          $("#valid-dates").append(validDates).text();  
          
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
          });
          
          
          temp814kmlLayer.eachLayer(function(layer){
            if (layer.options.fillColor === "#a80000") {
              layer.bindPopup("High Risk of Excessive Heat");
            }
            // layer.bindPopup(layer.options.id);
            // console.log(layer.options.fillColor);
            // console.log(layer);
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
            $('#temp-probabilistic-814-chkbox').hide();           
          }
          else
          {
            $('#temp-probabilistic-814-no-hazards').hide();
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
          });
          
          probTemp814kmlLayer.eachLayer(function(layer){            
            if (layer.options.fillColor === "#73b2ff") {
              layer.bindPopup("Slight Risk of Much Below Normal Temperatures");
            }            
            
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
            // console.log(probExcessHeat814kmlLayer);
            layer.bindPopup("Slight Risk of Excessive Heat");
            if (layer.options.fillColor === "#a80000") {
              // layer.bindPopup("High Risk of Excessive Heat");
            }
            if (layer.options.fillColor === "#73b2ff") {
              layer.bindPopup("Slight Risk of Much Below Normal Temperatures");
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
              
            if (layer.options.fillColor === "#73b2ff") {
              layer.bindPopup("Slight Risk of Much Below Normal Temperatures");
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
            if (layer.options.fillColor === "#73b2ff") {
              layer.bindPopup("Slight Risk of Much Below Normal Temperatures");
            }            
            
          });      
          
        }
        
        // temp814kmlLayer.on('ready', function() {
        //   temp814kmlLayer.eachLayer(function(layer){
        // 
        //     console.log(layer);
        //   });
        // });
        // temp814kmlLayer.eachLayer(function(Layer){
        //     // layer.bindPopup(layer.getPopup());
        //     //layer.bindPopup(layer.feature.properties.styleUrl);            
        //     console.log(Layer.options);
        // });

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
            hazardsmap.addLayer(excessHeat814kmlLayer)
          } else {
            hazardsmap.removeLayer(temp814kmlLayer)
            hazardsmap.removeLayer(excessHeat814kmlLayer)
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
            if (this.value == 'conus') {
              hazardsmap.setView(new L.LatLng(38, -96), 4)
            }
            else if (this.value == 'alaska') {
              hazardsmap.setView(new L.LatLng(64.2,-149.4), 4)
            }
        });



        /*document.querySelector("input[id=precip-hazards-814]").addEventListener('change', function() {
          if(this.checked) hazardsmap.addLayer(prcp814kmlLayer)
            else hazardsmap.removeLayer(prcp814kmlLayer)
          })*/

})(jQuery);
