let lad;
let long;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function setPosition(position) {
    lad = position.coords.latitude;
    long =  position.coords.longitude;
    showMap();
}



function showMap(){
    console.log(lad);
    console.log(long);
    $('#map').append(`<iframe
  width="600"
  height="450"
  frameborder="0" style="border:0"
  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC9cq0C9hKbLH8pY-dp33N09L2lkVbU2xc
    &q=Yahoo+New+York&center=${lad},${long}" allowfullscreen>
</iframe>`)
}


let newEvent;
let ticketURL;

function autoRegister() {
     $(document).ready(function() {
        
       var token = '4FCWIL2LHNN22RG4DZRH';
        var $events = $("#events");
        
       $.get('https://www.eventbriteapi.com/v3/events/search/?location.address=New+York%2C+NY+10036&price=free&start_date.keyword=today&token='+token, function(res) {
            if(res.events.length) {
                var s = "<ul class='eventList'>"
                let randomEvent =  Math.floor(Math.random() * res.events.length)
                newEvent = res.events[randomEvent]
                ticketURL = "//eventbrite.com/tickets-external?eid="+newEvent.id+"&ref=etckt"
                document.getElementById("ticket").src = ticketURL

               
               

               // window.open('https://www.eventbrite.com/#/signin');


               s += "<li><a href='" + newEvent.url + "'>" + newEvent.name.text +  "</a> </li>"
                
               $events.html("You're going to: " + s);
             } else {
                $events.html("<p>Sorry, there are no upcoming events.</p>");
            }
        });
        
       
   });
}

function submitScore() {
       firebase.database().ref(myName).set(
        {
            HighScore : 10
        }
    )
}

// Show data
 var database = firebase.database().ref()

database.on("child_added",  function(rowData) {
    $("body").append("<div><em><font size='5'>"+rowData.key+" : "+rowData.val().HighScore+"</em></font></div>");
})

function updateDB(){

   const name = $("#name").val();
    const message = $("#message").val();
    myName = name

   console.log(`${name} : ${message}`);
    $(".userData").append(`<p><center><font color='white'><font size='10'>Welcome: ${name}</font></font></center></p>`)


   //Update database here
    
   

}


var Layout = function () {
    
    // detect mobile device
    var isMobileDevice = function() {
        return  ((
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
            navigator.userAgent.match(/Opera Mini/i) ||
            navigator.userAgent.match(/IEMobile/i)
        ) ? true : false);
    }

    // handle on page scroll
    var handleHeaderOnScroll = function() {
        if ($(window).scrollTop() > 60) {
            $("body").addClass("page-on-scroll");
        } else {
            $("body").removeClass("page-on-scroll");
        }
    }

    // Handle Header
    var handleOnePageHeader = function() {
        // jQuery to collapse the navbar on scroll
        if ($('.navbar').offset().top > 150) {
            $('.navbar-fixed-top').addClass('top-nav-collapse');
        }
        $(window).scroll(function() {
            if ($('.navbar').offset().top > 150) {
                $('.navbar-fixed-top').addClass('top-nav-collapse');
            } else {
                $('.navbar-fixed-top').removeClass('top-nav-collapse');
            }
        });

        var $offset = 0;
        $offset = $(".navbar-fixed-top").height()-20;
        
        // jQuery for page scrolling feature - requires jQuery Easing plugin
        $('.js_nav-item a').bind('click', function(event) {
            var $position = $($(this).attr('href')).offset().top;
            $('html, body').stop().animate({
                scrollTop: $position - $offset
            }, 600);
            event.preventDefault();
        });

        var $scrollspy = $('body').scrollspy({target: '.navbar-fixed-top', offset: $offset+2});

        // Collapse Navbar When It's Clickicked
        $(window).scroll(function() {
            $('.navbar-collapse.in').collapse('hide');
        });
    }

    // handle carousel
    var handleCarousel = function() {
        var $item = $('.carousel .item'); 
        var $wHeight = $(window).height();
        $item.eq(0).addClass('active');
        $item.height($wHeight); 
        $item.addClass('full-screen');

        $('.carousel img').each(function() {
            var $src = $(this).attr('src');
            var $color = $(this).attr('data-color');
            $(this).parent().css({
                'background-image' : 'url(' + $src + ')',
                'background-color' : $color
            });
            $(this).remove();
        });

        $(window).on('resize', function (){
            $wHeight = $(window).height();
            $item.height($wHeight);
        });
    }

    // handle group element heights
    var handleHeight = function() {
       $('[data-auto-height]').each(function() {
            var parent = $(this);
            var items = $('[data-height]', parent);
            var height = 0;
            var mode = parent.attr('data-mode');
            var offset = parseInt(parent.attr('data-offset') ? parent.attr('data-offset') : 0);

            items.each(function() {
                if ($(this).attr('data-height') == "height") {
                    $(this).css('height', '');
                } else {
                    $(this).css('min-height', '');
                }

                var height_ = (mode == 'base-height' ? $(this).outerHeight() : $(this).outerHeight(true));
                if (height_ > height) {
                    height = height_;
                }
            });

            height = height + offset;

            items.each(function() {
                if ($(this).attr('data-height') == "height") {
                    $(this).css('height', height);
                } else {
                    $(this).css('min-height', height);
                }
            });

            if(parent.attr('data-related')) {
                $(parent.attr('data-related')).css('height', parent.height());
            }
       });
    }

    // Handle Work Popup
    var handleWorkPopup = function() {
        var overlay = $('.work-popup-overlay'),
            close = $('.work-popup-close'),
            trigger = $('.work-popup-trigger');

        trigger.on('click', function() {
            $(this).find('.work-popup-overlay').removeClass('work-popup-overlay-show');
            $(this).find('.work-popup-overlay').addClass('work-popup-overlay-show');
        });

        close.on('click', function(e) {
            e.stopPropagation();
            overlay.removeClass('work-popup-overlay-show');
        });
    }

    return {
        init: function () {
            // initial setup for fixed header
            handleHeaderOnScroll();
            handleOnePageHeader(); // initial header
            handleCarousel(); // initial setup for carousel
            handleHeight(); // initial setup for group element height
            handleWorkPopup(); // initial setup for group work popup
            
            // handle minimized header on page scroll
            $(window).scroll(function() {
                handleHeaderOnScroll();
            });
        },

        // To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
        getViewPort: function() {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }

            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        },
    };
}();

$(document).ready(function() {
    Layout.init();
    getLocation();

    
});

function onSignIn(googleUser) {
    console.log('User signed in!');
    var profile = googleUser.getBasicProfile();
    //change userName text, img source, & email text based on profile
    $(".userName").text(profile.getName());
    $("imgURL").attr("src", profile.getImageUrl());
    $(".email").text(profile.getEmail());
}

//called when "sign out" button clicked
function onSignOut() {
    //should sign user out and toggleHidden
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        if (confirm('Save progress?')) {
    // Save it!
} else {
    // Do nothing!
}
        console.log('User signed out.')
        //setting back to default
        $(".userName").text("GUEST");
        $("imgURL").attr("src", "assets/placeholder.png");
        $(".email").text("");
    });
}