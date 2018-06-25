$(document).ready(function () {
    var $navbar = $("#mNavbar");
    var topOffset = $navbar.offset().top;

    AdjustHeader(); // Incase the user loads the page from halfway down (or something);
    $(window).scroll(function () {
        AdjustHeader();
    });

    function AdjustHeader() {
        if ($(window).scrollTop() > topOffset) {
            if (!$navbar.hasClass("navbar-fixed-top")) {
                $navbar.addClass("navbar-fixed-top");
            }
        } else {
            $navbar.removeClass("navbar-fixed-top");
        }
    }
    //Change active 
    var navItem = $('ul.navbar-nav > li');
    navItem.on('click',function(){
        console.log($(this));
        $('ul.navbar-nav li.active').removeClass('active');
        $(this).addClass('active');
    })
});