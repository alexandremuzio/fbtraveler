var map;
var directionsDisplay;
var directionsService;
var markerDisplay;
var markerArray = [];
var waypointsArray = [];
var start;
var end;

var points;

function initialize() {
  // Instantiate a directions service.
  directionsService = new google.maps.DirectionsService();

  // Create a map and center it on start.
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(points[0].x, points[0].y)
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Create a renderer for directions and bind it to the map.
  var rendererOptions = {
    map: map,
    suppressMarkers: true
  }
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

  // Instantiate an info window to hold marker content.
  markerDisplay = new google.maps.InfoWindow();

  createRoute(points);

  // Start calculating the route
  refreshMode();
}

function refreshMode() {

  // First, remove any existing markers from the map.
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Now, clear the array itself.
  markerArray = [];

  // Retrieve the start and end locations and create
  // a DirectionsRequest using the specific direction.
  var selectedMode = document.getElementById('mode').value;
  
  // Make the request
  makeRequest(selectedMode);
}

function createRoute(points) {
  var maxDist = 0;
  var dist;
  var startPoint, endPoint;
  
  for (var i = 0; i < points.length; i++) {
    for (var j = i+1; j < points.length; j++) {
      dist = (points[i].x - points[j].x)*(points[i].x - points[j].x) + (points[i].y - points[j].y)*(points[i].y - points[j].y);
      if (maxDist < dist) {
        startPoint = i;
        endPoint = j;
        maxDist = dist;
      }  
    }
  }

  start = new google.maps.LatLng(points[startPoint].x, points[startPoint].y);
  end = new google.maps.LatLng(points[endPoint].x, points[endPoint].y);

  for (var i = 0; i < points.length; i++) {
    if (i != startPoint && i != endPoint) {
      waypointsArray.push({
        location: new google.maps.LatLng(points[i].x, points[i].y),
        stopover: true
      });
    }
  }
}

function makeRequest(selectedMode) {     
  var request = {
      origin: start,
      destination: end,
      waypoints: waypointsArray,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode[selectedMode]
  };

  // Route the directions and pass the response to a
  // function to create markers for each step.
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });

  createCustomMarkers(points);
}

function createCustomMarkers(points) {
  // First, remove any existing markers from the map.
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Now, clear the array itself.
  markerArray = [];

  // For each waypoint make a custom marker
  for (var i = 0; i < points.length; i++) {
    var contentString = '<a href="' + points[i].link + '" target="_blank"><img src="' + points[i].url + '" width="150" height="150" border="0"></a> <p><b>Location</b>: ' + points[i].location +
    '<br><b>From</b>: ' + '<a href="' + points[i].fromLink + '" target="_blank">' + points[i].from + '</a></p>';
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(points[i].x, points[i].y),
      map: map
    });
    attachInstructionText(marker, contentString);
    markerArray[i] = marker;
  }

}

function attachInstructionText(marker, contentString) {
  google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on,
    // containing the text of the step.
    markerDisplay.setContent(contentString);
    markerDisplay.open(map, marker);
  });
}      

// google.maps.event.addDomListener(window, 'load', initialize);