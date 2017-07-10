
var numbers = /([1-6])/;
var validNumberOfPeople = false;

var motorbikePrice = 109;
var smallCarPrice = 129;
var largeCarPrice = 144;
var motorHomePrice = 200;

var petrolPrice = 1.859;

var transportType = 0;

// var numberOfPeople = parseInt($("#numberOfPeople").val());

var letersPer100;

var distanceNumber;

var pertrolMath;
var totalCost;

var maxNumPeople = 6;
var maxNumDays = 5;

var noErrors = false;

var numberOfPeople = parseInt($("#numberOfPeople").val());
var numberOfDays = parseInt($("#numberOfDays").val());

var daysValidInput = false;
var peopleValidInput = false;




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
   distanceNumber = parseFloat(distance.replace(",", ""));

   console.log(distanceNumber);

};





//Jquery

$(document).ready(function(){


  $("#calculate").click(function(event){
    event.preventDefault();
  });

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


    $("#numberOfPeople").keyup(function(){

       numberOfPeople = parseInt($("#numberOfPeople").val());
     
         var numberOfPeopleErrors = $("#numberOfPeople").parent().find('span.input-errors');
      numberOfPeopleErrors.empty();

       if($(this).val().length === 0){
        numberOfPeopleErrors.text("This field is required").removeClass("success").addClass("error");
        return;
      }

     

      if($("#numberOfPeople").val() >6 ) {
        numberOfPeopleErrors.text("Must be between 1 and 6").removeClass("success").addClass("error");
        noErrors = false;
        validNumberOfPeople = false;
        peopleValidInput = false;




    }else if($("#numberOfPeople").val() <1 ) {
        numberOfPeopleErrors.text("Must be between 1 and 6").removeClass("success").addClass("error");
        noErrors = false;
        validNumberOfPeople = false;

    }else{
      noErrors = true;
      peopleValidInput = true;
    }

console.log(peopleValidInput);



    });




    $("#numberOfDays").keyup(function(){

      numberOfDays = parseInt($("#numberOfDays").val());
      var numberOfDaysErrors = $("#numberOfDays").parent().find('span.input-errors');
      numberOfDaysErrors.empty();

       if($(this).val().length === 0){
        numberOfDaysErrors.text("This field is required").removeClass("success").addClass("error");
        validNumberOfDays = false;
        return;
      }else if($("#numberOfDays").val() >15 ) {
        numberOfDaysErrors.text("Must be between 1 and 15").removeClass("success").addClass("error");
        noErrors = false;
        
        validNumberOfDays = false;
      }else{
      noErrors = true;
      daysValidInput = true;
      
    }

  if($("#numberOfDays").val() <1 ) {
        numberOfDaysErrors.text("Must be between 1 and 15").removeClass("success").addClass("error");
        noErrors = false;
        validNumberOfPeople = false;

    }else{
      // noErrors = true;
      validNumberOfDays = true;

    }

    });




    $("#numberOfDays, #numberOfPeople").keyup(function(){
      // var numberOfPeopleErrors = $("#numberOfPeople").parent().find('span.input-errors');
      // numberOfPeopleErrors.empty();

      // var numberOfDaysErrors = $("#numberOfDays").parent().find('span.input-errors');
      // numberOfDaysErrors.empty();
      //This element is required
      // if($(this).val().length === 0){
      //   numberOfPeopleErrors.text("This field is required").removeClass("success").addClass("error");
      //   return;
      // }
      	if ((daysValidInput == true) &&  (peopleValidInput == true) ) {

		$("#button-blocker").hide();
		alert("Nice");


      	}else{
      		$("#button-blocker").show();
      		alert("Whoop");
      	}
  

     numberOfPeople = parseInt($("#numberOfPeople").val());
     numberOfDays = parseInt($("#numberOfDays").val());


  //    if($("#numberOfPeople").val() >5 ) {
  //       numberOfPeopleErrors.text("Must be between 1 and 6").removeClass("success").addClass("error");
  //       noErrors = false;
  //       validNumberOfPeople = false;

  //   }else{
  //     noErrors = true
  //   }

  // if($("#numberOfPeople").val() <1 ) {
  //       numberOfPeopleErrors.text("Must be between 1 and 6").removeClass("success").addClass("error");
  //       noErrors = false;
  //       validNumberOfPeople = false;

  //   }else{
  //     noErrors = true;
  //     validNumberOfPeople = true;
  //   }
    



      if( (numberOfPeople <= 1) && (numberOfPeople > 0) && (numberOfDays <= 5) && (numberOfDays >= 1)){
          $("#motorbike").show();

             }else{

              $("#motorbike").hide();
             }



             if((numberOfPeople <= 2) && (numberOfPeople >= 1) && (numberOfDays <= 10) && (numberOfDays >= 1)){
          $("#small-car").show();

             }else{

              $("#small-car").hide();
             }

             if((numberOfPeople <= 5) && (numberOfPeople >= 1) && (numberOfDays <= 10) && (numberOfDays >= 3)){
          $("#large-car").show();

             }else{

              $("#large-car").hide();
             }

        if((numberOfPeople <= 6) && (numberOfPeople >= 2) && (numberOfDays <= 15) && (numberOfDays >= 2)){
          $("#motor-home").show();

             }else{

              $("#motor-home").hide();
             }




      // console.log(numberOfPeople);
      // console.log(numberOfDays);
      console.log(noErrors);
  
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

  maxNumPeople = 7;
   // if($(this).val() > maxNumPeople){
   //      numberOfPeopleErrors.text("Must be between 1 - 6 people").removeClass("success").addClass("error");
   //      return;
   //  }


});

$("#button-blocker").click(function(){

alert("not all fields have been completed correctly")
// $("#button-blocker").hide();


});

$("#calculate").click(function(){



  if (noErrors == true) {

    

  	console.log(motorbikePrice + petrolPrice);
    // console.log(distance);

var people = parseInt($("#numberOfPeople").val());
var howManyDays = parseInt($("#numberOfDays").val());
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
 
  $("#total-cost").empty().prepend("<div><h4 class='circle'>"+"$"+totalCost.toFixed()+"</h4></div>");

  // $("#total-cost").empty().prepend("<div><h4 class='circle'>"+"$"+totalCost.toPrecision(3)+"</h4></div>");
  }else{
    $("button-blocker").hide();
  }


console.log(noErrors);
 



  

 });



  
  // parsefloat when getting the number from distance

});




google.maps.event.addDomListener(window, "load", initMap);

