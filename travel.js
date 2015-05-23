var map;
var directionsDisplay;
var directionsService;
var markerDisplay;
var markerArray = [];
var waypointsArray = [];
var start;
var end;
/*var myPoints = [
        {
          x: 43.723004,
          y: 10.396564,
          url: "https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/312980_180871311999538_1674390193_n.jpg?oh=2942c1b427b3f84c314c34ee65795a77&oe=560031C6&__gda__=1443549839_f301c68aeb44ea0fa654c95af3226fa1",
          link: "https://www.facebook.com/photo.php?fbid=180871311999538",
          location: "Tower of Pisa",
          from: "Victor Pascoal",
          fromLink: "https://www.facebook.com/100002300127658",
          country: "Italy"
        },
        {
          x: 41.890182,
          y: 12.492199,
          url: "https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/381615_180873558665980_816673707_n.jpg?oh=0ed9ace379ddf685fcd5d7076fe11924&oe=55C59510&__gda__=1443403433_6e18673040dae6f046cb3df0b75f7798",
          link: "https://www.facebook.com/photo.php?fbid=180869988666337",
          location: "Colosseum",
          from: "Victor Pascoal",
          fromLink: "https://www.facebook.com/100002300127658",
          country: "Italy"
        },
        {
          x: 43.767937,
          y: 11.253412,
          url: "https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/388328_180871785332824_717595802_n.jpg?oh=5f96005674047074d1123c89c7a94ae1&oe=55D1DE59&__gda__=1438687368_38547229a55143f7fe9063ca51a5c887",
          link: "https://www.facebook.com/photo.php?fbid=180871785332824",
          location: "Ponte Vecchio",
          from: "Victor Pascoal",
          fromLink: "https://www.facebook.com/100002300127658",
          country: "Italy"
        }
      ];;
*/
function initialize(points) {
  myPoints = points;

  // Instantiate a directions service.
  directionsService = new google.maps.DirectionsService();

  // Create a map and center it on start.
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(myPoints[0].x, myPoints[0].y)
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

  createRoute(myPoints);

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

  createCustomMarkers(myPoints);
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

//google.maps.event.addDomListener(window, 'load', initialize);