 $(window).scroll(function() {
  var sticky = $('.static-header');
    var gettingstarted = $('.static-header2');
    scroll = $(window).scrollTop();
   
  if (scroll >= 40) { 
    sticky.addClass('sticky-header');
    gettingstarted.addClass('getting-started');
     }
  else { 
   sticky.removeClass('sticky-header');
       gettingstarted.removeClass('getting-started');

}
});



  $(window).scroll(function() {
  //var sticky = $('.static-header');
    var gettingstarted = $('.static-header2');
    scroll = $(window).scrollTop();
   
  if (scroll >= 40) { 
    //sticky.addClass('sticky-header');
    gettingstarted.addClass('getting-started');
     }
  else { 
   //sticky.removeClass('sticky-header');
       gettingstarted.removeClass('getting-started');

}
});


 // it is for goto top
 
 $("#gotop").hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 80) {
            $('#gotop').fadeIn();
        } else {
            $('#gotop').fadeOut();
        }
    });

    $('#gotop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });