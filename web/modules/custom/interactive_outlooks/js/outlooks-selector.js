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
            $('.grid-row.outlooks .temp').show(500);
            $('.grid-row.outlooks .precip').hide(500);
            $('.grid-row.outlooks .hazards').hide(500);
            $('.grid-row.outlooks .drought').hide(500);
            break;
          case 'precip':
            e.preventDefault();
            $('.grid-row.outlooks .precip').show(500);
            $('.grid-row.outlooks .temp').hide(500);
            $('.grid-row.outlooks .hazards').hide(500);
            $('.grid-row.outlooks .drought').hide(500);
            localStorage.setItem('testForm', JSON.stringify('precip'));
            break;
          case 'hazards':
            e.preventDefault();
            $('.grid-row.outlooks .hazards').show(500);
            $('.grid-row.outlooks .temp').hide(500);
            $('.grid-row.outlooks .precip').hide(500);
            $('.grid-row.outlooks .drought').hide(500);
            break;
          case 'drought':
            e.preventDefault();
            $('.grid-row.outlooks .drought').show(500);
            $('.grid-row.outlooks .temp').hide(500);
            $('.grid-row.outlooks .precip').hide(500);
            $('.grid-row.outlooks .hazards').hide(500);
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
