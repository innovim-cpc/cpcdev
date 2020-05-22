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

      $('.grid-row.outlooks .temp').fadeIn();
      $('.grid-row.outlooks .precip').hide();
      $('.grid-row.outlooks .hazards').hide();
      $('.grid-row.outlooks .drought').hide();
      $('.grid-row.outlooks .global-tropics').hide();
      $('.grid-row.outlooks .week34').hide();

      $("#outlooks-selector").on('submit', function(e) {
        const selectedVal = $("#outlook-options").val();
        switch(selectedVal) {
          case 'temp':
            e.preventDefault();
            $('.grid-row.outlooks .temp').fadeIn(500);
            $('.grid-row.outlooks .precip').hide();
            $('.grid-row.outlooks .hazards').hide();
            $('.grid-row.outlooks .drought').hide();
            $('.grid-row.outlooks .global-tropics').hide();
            $('.grid-row.outlooks .week34').hide();
            break;
          case 'precip':
            e.preventDefault();
            $('.grid-row.outlooks .precip').fadeIn(500);
            $('.grid-row.outlooks .temp').hide();
            $('.grid-row.outlooks .hazards').hide();
            $('.grid-row.outlooks .drought').hide();
            $('.grid-row.outlooks .global-tropics').hide();
            $('.grid-row.outlooks .week34').hide();
            break;
          case 'hazards':
            e.preventDefault();
            $('.grid-row.outlooks .hazards').fadeIn(500);
            $('.grid-row.outlooks .temp').hide();
            $('.grid-row.outlooks .precip').hide();
            $('.grid-row.outlooks .drought').hide();
            $('.grid-row.outlooks .global-tropics').hide();
            $('.grid-row.outlooks .week34').hide();
            break;
          case 'drought':
            e.preventDefault();
            $('.grid-row.outlooks .drought').fadeIn(500);
            $('.grid-row.outlooks .temp').hide();
            $('.grid-row.outlooks .precip').hide();
            $('.grid-row.outlooks .hazards').hide();
            $('.grid-row.outlooks .global-tropics').hide();
            $('.grid-row.outlooks .week34').hide();
            break;
          case 'global-tropics':
            e.preventDefault();
            $('.grid-row.outlooks .global-tropics').fadeIn(500);
            $('.grid-row.outlooks .temp').hide();
            $('.grid-row.outlooks .precip').hide();
            $('.grid-row.outlooks .hazards').hide();
            $('.grid-row.outlooks .drought').hide();
            $('.grid-row.outlooks .week34').hide();
            break;
          case 'week34':
            e.preventDefault();
            $('.grid-row.outlooks .week34').fadeIn(500);
            $('.grid-row.outlooks .temp').hide();
            $('.grid-row.outlooks .precip').hide();
            $('.grid-row.outlooks .hazards').hide();
            $('.grid-row.outlooks .global-tropics').hide();
            $('.grid-row.outlooks .drought').hide();
            break;
          default:
            e.preventDefault();
            $('.grid-row.outlooks .temp').fadeIn();
            $('.grid-row.outlooks .precip').hide();
            $('.grid-row.outlooks .hazards').hide();
            $('.grid-row.outlooks .drought').hide();
            $('.grid-row.outlooks .global-tropics').hide();
            $('.grid-row.outlooks .week34').hide();
        }
      });

    //  }); // .once
  //  } // attach
  //}; // behaviors

})(jQuery);
