/**
 * @file
 * Outlooks selector
 *
 */
(function ($) {
  "use strict";

   //Drupal.behaviors.createDroughtMap = {
   	//attach:function (context, settings) {

   	  //$('#outlooks-selector', context).once('.outlooks', function() {

      $('.grid-row.outlooks .drought').hide();
      $('.grid-row.outlooks .hazards').hide();
      $('.grid-row.outlooks .temp').show();
      $('.grid-row.outlooks .precip').hide();

      $("#outlooks-selector").on('submit', function(e) {
        var selectedVal = $("#outlook-options").val();
        if(selectedVal == "hazards"){
          e.preventDefault();
          console.log('hazards!');
          $('.grid-row.outlooks .drought').hide();
          $('.grid-row.outlooks .hazards').show();
          $('.grid-row.outlooks .temp').hide();
          $('.grid-row.outlooks .precip').hide();
        } else if(selectedVal == "drought"){
          e.preventDefault();
          $('.grid-row.outlooks .hazards').hide();
          $('.grid-row.outlooks .drought').show();
          $('.grid-row.outlooks .temp').hide();
          $('.grid-row.outlooks .precip').hide();
        }
        else if(selectedVal == "temp"){
          e.preventDefault();
          $('.grid-row.outlooks .hazards').hide();
          $('.grid-row.outlooks .drought').hide();
          $('.grid-row.outlooks .temp').show();
          $('.grid-row.outlooks .precip').hide();
        }
        else if(selectedVal == "precip"){
          e.preventDefault();
          $('.grid-row.outlooks .hazards').hide();
          $('.grid-row.outlooks .drought').hide();
          $('.grid-row.outlooks .temp').hide();
          $('.grid-row.outlooks .precip').show();
        }
      });

    //  }); // .once
  //  } // attach
  //}; // behaviors

})(jQuery);
