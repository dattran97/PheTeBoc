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
    //Login button pressed
    $('#loginBtn').on('click',function(){
        window.location.href = 'login.html';
    });
    //Handling sizing window
    var $productView = $('.productView');
    var $listItem = $('.productView > div');
    var $firstItem = $listItem.first();

    var hanldWindowSizing = function(){
        var viewWidth = parseInt($productView.css('width'),10);
        var itemWidth = parseInt($firstItem.css('width'),10);

        var itemsPerRow = Math.floor(viewWidth/(itemWidth + parseInt($firstItem.css('padding-left'),10)));

        //set height for $productView
        var maxItemPerCol = Math.ceil($listItem.length/itemsPerRow) ;

        var viewHeight = maxItemPerCol * (parseInt($firstItem.css('height'),10) + parseInt($firstItem.css('margin-top'),10));
        $productView.css('height',viewHeight + parseInt($productView.css('padding-bottom'),10));
    }
    hanldWindowSizing();
    $(window).on('resize',function(){
        hanldWindowSizing();
    })
});