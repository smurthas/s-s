  $(document).ready(function() {

    // center entry landing and size (?)
    // CODE NEEDED

    // set deadspace to height of screen
//    $('#deadspace').css('height', 100);
 //     $('#nav').fadeIn();
  });


  var SWITCH_POS = 200;
  // scrolling behavior function
  $(window).scroll(function () {

    var pos = $("body").scrollTop();

    if (pos < SWITCH_POS){

      if ( $('#nav').is(':visible')){
        $('#nav').fadeOut();
      }
    }


    if (pos > SWITCH_POS){
      if ( $('#entry_landing').is(':visible')){
        $('#nav').fadeIn();
      }
    }

    // set opacity of entry_landing
    $('#entry_landing').css('opacity', 1-(pos/SWITCH_POS));

  //console.log( $("body").scrollTop() );

  });

// jump function to animate smoothly
function jump(id){

  // calculate where to scroll to
  var offset = $(id).offset().top - $('#nav').outerHeight() - 10;

  //console.log(offset);
  $('body').animate({scrollTop: offset}, 400);
}

$(function(){
//				$('#slides').slides({
//					generateNextPrev: true
//				});


  $('.slides').slides({
    preload: true,
    generateNextPrev: true
  });

});
