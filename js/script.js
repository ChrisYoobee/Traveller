
var numbers = /([1-6])/;
var validNumberOfPeople = false;

var motorbikePrice = 109;
var smallCarPrice = 129;
var largeCarPrice = 144;
var motorHomePrice = 200;

var petrolPrice = 1.859;

var transportType = 0;

var numberOfPeople = $("#numberOfPeople");

var letersPer100;

var distanceNumber;

var pertrolMath;
var totalCost;




function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          mapTypeControl: false,
          center: {lat: -41.2897721,
 					lng: 174.7731366},
          zoom: 6,
          scrollwheel: false,
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






function DistanceDisplay(distance,duration,end_address){
   var Details = $("#Details").val();
   $("#routeDistance").empty().prepend("<div><h4>"+distance+"</h4></div>");
   $("#routeDuration").empty().prepend("<div><h4> about "+duration+"</h4></div>");
   $("#routeAddress").empty().prepend("<div><h4>"+end_address+"</h4></div>");
   distanceNumber = parseFloat(distance);
   console.log(distanceNumber);

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

numbers = /([1-6])/;

	//Blur is when you have left an element
    $("#numberOfPeople").keyup(function(test){
      var numberOfPeopleErrors = $(this).parent().find('span.input-errors');
      numberOfPeopleErrors.empty();
      //This element is required
      if($(this).val().length === 0){
        numberOfPeopleErrors.text("This field is required").removeClass("success").addClass("error");
        return;
      }
     maxNumber = $(this).parent().find('span.input-errors');
      if($(this).val() < 7){
        $(this).parent().find('span.input-errors .numbers').remove();
      } else if( (!$(this).val().match(numbers)) && ($("li.numbers").length === 0) ){
        $(this).parent().find('span.input-errors ul').append("<li class='numbers'>Must be between 1 - 6</li>")
      }
     
      numberOfPeopleErrors.text("No errors").removeClass("error").addClass("success");
      validNumberOfPeople = true;
    });


    $("#motorbike").click(function(){
        // $("#motorbike").remove();
        $("#dropdown").text("Motorbike");
    });

    $("#small-car").click(function(){
        // $("#small-car").remove();
        $("#dropdown").text("Small Car");
    });

    $("#large-car").click(function(){
        // $("#large-car").remove();
        $("#dropdown").text("Large Car");
    });

    $("#motor-home").click(function(){
        // $("#motor-home").remove();
        $("#dropdown").text("Motor Home");
    });

$("#motorbike").click(function(){

  transportType = motorbikePrice;
  letersPer100 = 3.7
  $("#hire-type").empty().prepend("<div><h4>"+"Motorbike"+"</h4></div>");
 

});

$("#small-car").click(function(){

  transportType = smallCarPrice;
  letersPer100 = 8.5;
  $("#hire-type").empty().prepend("<div><h4>"+"Small Car"+"</h4></div>");

});

$("#large-car").click(function(){

  transportType = largeCarPrice;
  letersPer100 = 9.7;
  $("#hire-type").empty().prepend("<div><h4>"+"Large Car"+"</h4></div>");

  

});

$("#motor-home").click(function(){

  transportType = motorHomePrice;
  letersPer100 = 17;
  $("#hire-type").empty().prepend("<div><h4>"+"Motor Home"+"</h4></div>");


});



$("#calculate").click(function(){

  if (true) {

    

  	console.log(motorbikePrice + petrolPrice);
    // console.log(distance);
  }

 

var people = parseInt($("#numberOfPeople").val());
var howManyDays = parseInt($("#numberOfPeople").val());
console.log(howManyDays * transportType);

var totalHireCost = (howManyDays * transportType);
  	
	console.log("working");
  console.log(distanceNumber);
  console.log(totalHireCost);


  $("#hire-cost").empty().prepend("<div><h4>"+"$"+totalHireCost+"</h4></div>");

  pertrolMath = (distanceNumber  * letersPer100 / 100 * petrolPrice);
  console.log(pertrolMath);

  totalCost = (pertrolMath + totalHireCost);

  $("#petrol-cost").empty().prepend("<div><h4>"+"$"+pertrolMath.toPrecision(5)+"</h4></div>");
 
  $("#total-cost").empty().prepend("<div><h4 class='circle'>"+"$"+totalCost.toPrecision(3)+"</h4></div>");

  

 });



  
  // parsefloat when getting the number from distance

});




google.maps.event.addDomListener(window, "load", initMap);

