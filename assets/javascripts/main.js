jQuery(document).ready(function ($) {

    //"Top" button
    var scroll_timer;
    var displayed = false;
    var $message = jQuery('#message-footer');
    var $window = jQuery(window);
    var top = jQuery(document.body).children(0).position().top;
    
    $window.scroll(function () {
        window.clearTimeout(scroll_timer);
        scroll_timer = window.setTimeout(function () { 
        if($window.scrollTop() <= top) 
        {
            displayed = false;
            $message.fadeOut(500);
        }
        else if(displayed == false) 
        {
            displayed = true;
            $message.stop(true, true).fadeIn(500).click(function () { $message.fadeOut(500); });
        }
        }, 400);
    });
    
    jQuery('#top-link').click(function(e) {
            jQuery('html, body').animate({scrollTop:0}, 'slow');
            return false;
    });

    jQuery('#nav-lupa a').click(function(){
        jQuery(this).parent().children('form').toggle();
    });


    var options = {
        $AutoPlay: false,

        $PauseOnHover: true, //[Optional] Whether to pause when mouse over if a slideshow is auto playing, default value is false

        $ArrowKeyNavigation: true, //Allows arrow key to navigate or not
        $SlideWidth: 910, //[Optional] Width of every slide in pixels, the default is width of 'slides' container
        //$SlideHeight: 300, //[Optional] Height of every slide in pixels, the default is width of 'slides' container
        $SlideSpacing: 0, //Space between each slide in pixels
        $DisplayPieces: 2, //Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
        $ParkingPosition: Math.round(((window.innerWidth-910)/2)-8), //The offset position to park slide (this options applys only when slideshow disabled).
        $SlideDuration: 200,

        $ArrowNavigatorOptions: { //[Optional] Options to specify and enable arrow navigator or not
            $Class: $JssorArrowNavigator$, //[Requried] Class to create arrow navigator instance
            $ChanceToShow: 2, //[Required] 0 Never, 1 Mouse Over, 2 Always
            $AutoCenter: 2, //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
            $Steps: 1 //[Optional] Steps to go for each navigation request, default value is 1
        },
        $BulletNavigatorOptions: {                          //[Optional] Options to specify and enable navigator or not
            $Class: $JssorBulletNavigator$,                 //[Required] Class to create navigator instance
            $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
            $AutoCenter: 1,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
            $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
            $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
            $SpacingX: 1,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
            $SpacingY: 1,                                   //[Optional] Vertical space between each item in pixel, default value is 0
            $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
        },
    };

    var jssor_slider1 = new $JssorSlider$('slider1_container', options);

    jssor_slider1.$On($JssorSlider$.$EVT_PARK,function(slideIndex,fromIndex){
        $(".slider-overlay").show();
        $("#slide-overlay-" + slideIndex).hide('fast');
        //console.log(slideIndex);
    });

    //responsive code begin
    //you can remove responsive code if you don't want the slider scales while window resizes
    function ScaleSlider() {
        var parentWidth = jssor_slider1.$Elmt.parentNode.clientWidth;
        if (parentWidth)
            //jssor_slider1.$SetScaleWidth(Math.min(parentWidth, 1920));
            jssor_slider1.$SetScaleWidth(parentWidth);
        else
            $JssorUtils$.$Delay(ScaleSlider, 30);
    }

    ScaleSlider();
    $JssorUtils$.$AddEvent(window, "load", ScaleSlider);


    if (!navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile)/)) {
        $JssorUtils$.$OnWindowResize(window, ScaleSlider);
    }

    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
        $JssorUtils$.$AddEvent(window, "orientationchange", ScaleSlider);
    }



    



});
