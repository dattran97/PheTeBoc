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
    var itemHeight = parseInt($firstItem.css('height'));
   
    var handleSizing = function(){
        var viewWidth = parseInt($productView.css('width'));
        var itemWidth = parseInt($firstItem.css('width'));
        var itemsPerRow = Math.floor(viewWidth/(itemWidth + parseInt($firstItem.css('padding-left'))));
        //set height for $productView
        var maxItemPerCol = Math.ceil($listItem.length/itemsPerRow) ;
        var viewHeight = maxItemPerCol * (itemHeight + parseInt($firstItem.css('margin-top')));
        $productView.css('height',viewHeight + parseInt($productView.css('padding-bottom')) + 'px');
    }
    //Called when load page with random width
    handleSizing();
    $(window).on('resize',function(){ //listenner for resizing event
        console.log('resizing');
        handleSizing();
    })
});