// Google Api with Markers

// var map;
// var marker;


// function init(){


// 	var mapOptions = {
// 		// Set where the map starts
// 		center:{
			

// 		lat: -41.2897721,
// 		lng: 174.7731366
// 		},

// 		zoom: 16,
// 		// Take s off UI for maps
// 		disableDefaultUI: false,

// 		// Turn off click to zoom
// 		disableDoubleClickZoom: false,

// 		// Turns off scroll to zoom
// 		scrollwheel: false,

// 		// Makes map draggable
// 		draggable: true,

// 		fullscreenControl: true,

// 		backgroundColor: "#eee",
// 		keyboardShortcuts: true,

// 		mapTypeControlOptions:{
// 			position: google.maps.ControlPosition.TOP_CENTER
// 		},

		

// 	}


// 	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	

// }

// google.maps.event.addDomListener(window, "load", init);



function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          mapTypeControl: false,
          center: {lat: -41.2897721,
 					lng: 174.7731366},
          zoom: 6
        });

        new AutocompleteDirectionsHandler(map);
      }

       /**
        * @constructor
       */
      function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'DRIVING';
        var originInput = document.getElementById('origin-input');
        var destinationInput = document.getElementById('destination-input');
        var modeSelector = document.getElementById('mode-selector');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});

        
        // this.setupClickListener('changemode-driving', 'DRIVING');

        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

      
      } 

    

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
          } else {
            me.destinationPlaceId = place.place_id;
          }
          me.route();
        });

      };

      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
            DistanceDisplay(response.routes[0].legs[0].distance.text, response.routes[0].legs[0].duration.text, response.routes[0].legs[0].end_address);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
          
      };

google.maps.event.addDomListener(window, "load", initMap);



// };
//   function(response, status) {
//        if (status == 'OK') {
//            directionsDisplay.setDirections(response);
//            console.log(response);
//            // console.log(response.routes[0].legs[0].distance.text);
//            DistanceDisplay(response.routes[0].legs[0].distance.text, response.routes[0].legs[0].duration.text, response.routes[0].legs[0].end_address);
           
//            } else {
//            window.alert('Directions request failed due to ' + status);
//            }
//        });

function DistanceDisplay(distance,duration,end_address){
   var Details = $("#Details").val();
   $("#routeDistance").empty().prepend("<div><h4>"+distance+"</h4></div>");
   $("#routeDuration").empty().prepend("<div><h4> about "+duration+"</h4></div>");
   $("#routeAddress").empty().prepend("<div><h4>"+end_address+"</h4></div>");

};



 








//Jquery

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


	//smooth scrolling:
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

  $("#lastname")
    .focus(function(){
      if($(this).val().length === 0){
        $(this).parent().find('span.input-errors').empty();
        $(this).parent().find('span.input-errors').append("<ul class='error'></ul>");
        $(this).parent().find('span.input-errors ul').append(
            "<li class='required'>This is required</li>"
            )
        }
    }).blur(function(){

    }).keyup(function(){
      if($(this).val().length !== 0 ){
        $(this).parent().find('span.input-errors .required').remove();
      } else if( ($(this).val().length === 0) && ( $("li.required").length === 0) ) {
        $(this).parent().find('span.input-errors ul').append("<li class='required'>This is required</li>");
      }
      if($(this).parent().find('span.input-errors ul li').length === 0){
        ValidLastName = true;
      }
    });
    
});




