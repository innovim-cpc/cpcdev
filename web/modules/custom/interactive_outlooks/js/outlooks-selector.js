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
      $('.grid-row.outlooks .hazards').show();

      $("#outlooks-selector").on('submit', function(e) {
        var selectedVal = $("#outlook-options").val();
        if(selectedVal == "hazards"){
          e.preventDefault();
          console.log('hazards!');
          $('.grid-row.outlooks .drought').hide();
          $('.grid-row.outlooks .hazards').show();
        } else if(selectedVal == "drought"){
          e.preventDefault();
          $('.grid-row.outlooks .hazards').hide();
          $('.grid-row.outlooks .drought').show();
        }
      });

    //  }); // .once
  //  } // attach
  //}; // behaviors

})(jQuery);
