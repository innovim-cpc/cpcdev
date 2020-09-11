(function ($) {
  //$(document).ready(function(){
  "use strict";
  var hash = window.location.hash;
  if (hash) {
    var element = $(hash);
    if (element.length) {
      element.trigger('click');
    }
  }
//});
})(jQuery);
