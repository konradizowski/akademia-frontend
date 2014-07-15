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



    var xMapa =52.22499; var yMapa =20.99128;
    var xyear=2014; var xmth=10; var xday=23;
    var ContentMapa='<h4>Sprzedaz i zysk 2014</h4><dl class="dl-horizontal"><dt>Termin:</dt><dd>26.06.2014</dd><dt>Prowadzący:</dt><dd>Wojtek Chojnacki, Andrzej Pyra, Tomasz Kaczmarek</dd><dt>Miejsce:</dt><dd>Centrum szkoleniowe ADGAR OCHOTA<br>Al. Jerozolimskie 181B<br>02-222 Warszawa</dd></dl>'; 

    
    // Countdown //
    $('#countdown').countdown({
        until: new Date(xyear, xmth - 1, xday), // new Date(year, mth - 1, day, hr, min, sec) - date/time to count down to 
        // or numeric for seconds offset, or string for unit offset(s): 
        // 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds 
        timezone: -4, // The timezone (hours or minutes from GMT) for the target times, or null for client local 
        layout: '{d<}<strong class="lead">{dn}</strong> <span class="text-grey">{dl}</span>{d>} {h<}<strong class="lead">{hn}</strong> <span class="text-grey">{hl}</span>{h>} {m<}<strong class="lead">{mn}</strong> <span class="text-grey">{ml}</span>{m>} {s<}<strong class="lead">{sn}</strong> <span class="text-grey">{sl}</span>{s>}',
        timeSeparator: '', // Separator for time periods 
        isRTL: false, // True for right-to-left languages, false for left-to-right 
        format: 'dHMS', // Format for display - upper case for always, lower case only if non-zero,
        // 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds
        alwaysExpire: true, // True to trigger onExpiry even if never counted down 
        onExpiry: liftOff // Callback when the countdown expires - 
        // receives no parameters and 'this' is the containing division 
    });
    $('#countdown2').countdown({
        until: new Date(xyear, xmth - 1, xday), 
        timezone: -4,
        layout: '{d<}<div class="span3"><div class="digit-container">{dn}<span class="label-container">{dl}</span></div></div>{d>}{h<}<div class="span3"><div class="digit-container">{hn}<span class="label-container">{hl}</span></div></div>{h>}{m<}<div class="span3"><div class="digit-container">{mn}<span class="label-container">{ml}</span></div></div>{m>}{s<}<div class="span3"><div class="digit-container">{sn}<span class="label-container">{sl}</span></div></div>{s>}',
        timeSeparator: '',
        isRTL: false, 
        format: 'dHMS',
        alwaysExpire: true,
        onExpiry: liftOff
    });
    // Functions if countdown timer runs out:
    function liftOff() {
        $('.hasCountdown').css({
            display: 'none'
        });
        $('#countdown').hide('fast');
        $('#countdown2').hide('fast');
        $('#register-button').addClass('hidden');
        //$('.register-box').append('<h2>ZakoĹczyliĹmy przyjmowanie zgĹoszeĹ na konferencjÄ.</h2>');
    }
    
    
    // Google Map //
    $('#map_canvas').gmap({ 
        'center': new google.maps.LatLng(xMapa, yMapa),  // Change this to your desired latitude and longitude
        'zoom': 14,
        'mapTypeControl': true,
        'navigationControl': true,
        'streetViewControl': false,
        'styles': [{
            stylers: [{
                gamma: 0.60
            }, {
                hue: "red"
            }, {
                invert_lightness: false
            }, {
                lightness: 2
            }, {
                saturation: -20
            }, {
                visibility: "on"
            }]
        }]
    });
    var image = {
        url: 'assets/images/marker.png', // Define the map marker file here
        // This marker is 30 pixels wide by 35 pixels tall.
        size: new google.maps.Size(51, 63),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at 15,35.
        anchor: new google.maps.Point(26, 63)
    };
    
    $('#map_canvas').gmap().bind('init', function () {
        $('#map_canvas').gmap('addMarker', {
            'id': 'marker-1',
            'position': xMapa + ", " + yMapa,
            'bounds': false,
            'icon': image,
        }).click(function () {
            $('#map_canvas').gmap('openInfoWindow', {
                'content': ''+ContentMapa+''
            }, this);
        });
    });



    



});
