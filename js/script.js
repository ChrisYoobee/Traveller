// Google Api with Markers

var map;
var marker;
var bounce;
var infobox;
var userLocation;
var clickMarker;
var closestMarker;
var toggleMarkerOn = true;
var changeTravelType = "DRIVING"
var distance;
var currentMarker;
var markers = [];
var allMarkers = [

	{
		lat: -41.2820381 ,
		lng:  174.7734063,
		title: "Chefs Palette Courtney place" ,
		description: "Food place"
	},
	{
		lat: -41.2820367 ,
		lng:  174.7580854,
		title: "Burgerfuel Courtney place" ,
		description: "Burger place"
	},
	{
		lat:  -41.2928764,
		lng: 174.7776247 ,
		title:  "Nandos",
		description:"Food place"
	},
	{
		lat: -41.2841113 ,
		lng: 174.7731321,
		title:  "McDonalds",
		description: "Food place"
	},
	{
		lat:  -41.2897721,
		lng:  174.7731366,
		title: "Subway" ,
		description: "Food place"
	},
	{
		lat:  -41.2934607,
		lng:  174.7830931,
		title: "KFC" ,
		description: "Food place"
	},
	{
		lat:  -41.2934907,
		lng:  174.7762954,
		title: "Burger King" ,
		description: "Food place"
	},
	{
		lat:  41.2898021,
		lng:  174.7936576,
		title: "Pita Pit" ,
		description: "Food place"
	},
	{
		lat:  -41.2898021,
		lng:  174.7623089,
		title: "Burger Liquer" ,
		description: "Food place"
	},
	{
		lat:  -41.2978421,
		lng:  174.775696,
		title: "Ekim Burgers" ,
		description: "Food place"
	},
	



];


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


		draggableCursor: "crosshair",
		fullscreenControl: true,

		backgroundColor: "#eee",
		keyboardShortcuts: true,

		mapTypeControlOptions:{
			position: google.maps.ControlPosition.TOP_CENTER
		},

		

	}


	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	

}

google.maps.event.addDomListener(window, 'load', init);

function addallMarkers(){
	for (var i = 0; i < allMarkers.length; i++) {
		marker = new google.maps.Marker({
		position:{
			lat: allMarkers[i].lat ,
			lng: allMarkers[i].lng
		},
		map: map,
		animation: google.maps.Animation.DROP,
		icon: "images/icon.png",
		title: allMarkers[i].title ,
		description: allMarkers[i].description ,
		draggable: true
	})
		markers.push(marker);
		allInfoBox(marker);
	}
}






	function toggleBounce(){
		if (marker.getAnimation() === null) {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}else{
			marker.setAnimation(null);
		}


	};


function infoBox(){

	infoBox = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, "click" , function(){
		infoBox.setContent(marker.title);
		infoBox.open(map, marker);

	});
}


function allInfoBox(marker){

	infoBox = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, "click" , function(){
		infoBox.setContent(marker.title + "<br>" + marker.description);
		infoBox.open(map, marker);
		
	currentMarker = marker;


	});
}











$(document).ready(function(){





});




