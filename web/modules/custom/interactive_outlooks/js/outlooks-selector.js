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

      $('.grid-row.outlooks .temp').show();
      $('.grid-row.outlooks .precip').hide();
      $('.grid-row.outlooks .hazards').hide();
      $('.grid-row.outlooks .drought').hide();

      $("#outlooks-selector").on('submit', function(e) {
        const selectedVal = $("#outlook-options").val();
        switch(selectedVal) {
          case 'temp':
            e.preventDefault();
            $('.grid-row.outlooks .temp').show();
            $('.grid-row.outlooks .precip').hide();
            $('.grid-row.outlooks .hazards').hide();
            $('.grid-row.outlooks .drought').hide();
            break;
          case 'precip':
            e.preventDefault();
            $('.grid-row.outlooks .precip').show();
            $('.grid-row.outlooks .temp').hide();
            $('.grid-row.outlooks .hazards').hide();
            $('.grid-row.outlooks .drought').hide();
            break;
          case 'hazards':
            e.preventDefault();
            $('.grid-row.outlooks .hazards').show();
            $('.grid-row.outlooks .temp').hide();
            $('.grid-row.outlooks .precip').hide();
            $('.grid-row.outlooks .drought').hide();
            break;
          case 'drought':
            e.preventDefault();
            $('.grid-row.outlooks .drought').show();
            $('.grid-row.outlooks .temp').hide();
            $('.grid-row.outlooks .precip').hide();
            $('.grid-row.outlooks .hazards').hide();
            break;
          default:
            e.preventDefault();
            $('.grid-row.outlooks .temp').show();
            $('.grid-row.outlooks .precip').hide();
            $('.grid-row.outlooks .hazards').hide();
            $('.grid-row.outlooks .drought').hide();
        }
      });

    //  }); // .once
  //  } // attach
  //}; // behaviors

})(jQuery);