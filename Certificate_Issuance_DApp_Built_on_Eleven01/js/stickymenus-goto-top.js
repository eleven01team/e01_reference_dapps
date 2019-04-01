$(document).ready(function() {
  

    $('.nav-icon').click(function(){
      $(".m-menu-bg").toggleClass("open");            
    });

    $('.nav-icon.open').click(function(){
        $(".m-menu-bg").removeClass("open");
    });

    $('#go-docs').click(function(){
      $(".submenu").toggleClass("open");            
    });

    $('#back-docs, .nav-icon.open').click(function(){
        $(".submenu").removeClass("open");
    });

 

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


    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();
             //alert(stickyNavTop);
        if (scrollTop > 100) { 
            $('.top-nav').addClass('sticky');
            $('.top-news').addClass('sticky');
            $('.header-logo').show(500);
            //$('.sticky-nav').show();  
            $('.top-nav.sticky').css('top', $('.top-news').height());      
        } else {        
            $('.top-nav').removeClass('sticky');
            //$('.sticky-nav').hide(); 
            $('.top-news').removeClass('sticky');
            $('.top-nav').css('top', 0); 
            $('.header-logo').hide();
        }
      };

      stickyNav();
      $(window).scroll(function() {
        stickyNav();
      });

    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });

    $('.media-carousel').owlCarousel({
        items:1,
        merge:true,
        loop:true,
        margin:10,
        dots:true,
        lazyLoad:true,
        center:true,
        nav:true,
        navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        responsive:{
            480:{
                items:1
            },
            600:{
                items:1
            }
        }
    })

    $("#educational-more").click(function () {
        $(this).text(function(i, v){
           return v === 'More' ? 'Less' : 'More'
        });
        $('#hidden-educational').slideToggle();
    });

});