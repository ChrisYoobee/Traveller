// Google Api with Markers

var map;
var marker;


function init(){


	var mapOptions = {
		// Set where the map starts
		center:{
			

		lat: -41.2897721,
		lng: 174.7731366
		},

		zoom: 16,
		// Take s off UI for maps
		disableDefaultUI: false,

		// Turn off click to zoom
		disableDoubleClickZoom: false,

		// Turns off scroll to zoom
		scrollwheel: false,

		// Makes map draggable
		draggable: true,

		fullscreenControl: true,

		backgroundColor: "#eee",
		keyboardShortcuts: true,

		mapTypeControlOptions:{
			position: google.maps.ControlPosition.TOP_CENTER
		},

		

	}


	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	

}

google.maps.event.addDomListener(window, "load", init);




$(document).ready(function(){

	//this is where we apply opacity to the arrow
	$(window).scroll( function(){

	  //get scroll position
	  var topWindow = $(window).scrollTop();
	  //multipl by 1.5 so the arrow will become transparent half-way up the page
	  var topWindow = topWindow * 1.5;
	  
	  //get height of window
	  var windowHeight = $(window).height();
	      
	  //set position as percentage of how far the user has scrolled 
	  var position = topWindow / windowHeight;
	  //invert the percentage
	  position = 1 - position;

	  //define arrow opacity as based on how far up the page the user has scrolled
	  //no scrolling = 1, half-way up the page = 0
	  $(".arrow-wrap").css("opacity", position);

	});






	//Code stolen from css-tricks for smooth scrolling:
	$(function() {
	  $("a[href*=#]:not([href=#])").click(function() {
	    if (location.pathname.replace(/^\//,"") == this.pathname.replace(/^\//,"") && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
	      if (target.length) {
	        $("html,body").animate({
	          scrollTop: target.offset().top
	        }, 800);
	        return false;
	      }
	    }
	  });
	});



	$(".to_top").on("mousedown", function() {
    $(this).toggleClass("clicked");
});

});




