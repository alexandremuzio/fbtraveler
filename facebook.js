function search_for_friends() {
FB.api('/me/friends?limit=50', function(response) {
	if (response && !response.error) {
	    console.log('API response', response);
	    var list = document.getElementById('userFriends');
	    var _li = document.createElement('li');
	    _li.innerHTML = response.summary.total_count;
	    list.appendChild(_li);
	    var friendsId = [];
	    var friendsName = [];
	    for (var i=0; i < response.data.length; i++) {
	      //var li = document.createElement('li');
	      //li.innerHTML = response.data[i].name + " id: " + response.data[i].id;
	      friendsId.push(response.data[i].id);
	      friendsName.push(response.data[i].name);
	      //list.appendChild(li);
	    }
	    for (var i = 0; i < friendsId.length; i++) {
	      var lii = document.createElement('li');
	      lii.innerHTML = friendsName[i] + ' ->' + friendsId[i];
	      list.appendChild(lii);
	      console.log(friendsId[i]);
	      FB.api('/'+friendsId[i]+'/photos?limit=50', function(response) {
	        var np = document.createElement('li');
	        np.innerHTML = 'nphotos = ' + response.data.length;
	        list.appendChild(np);
	        for (var j = 0; j < response.data.length; j++) {
	          var photo = response.data[j];
	          var place = photo.place;
	          if (place != undefined) {
	            var location = photo.place.location;
	            var li = document.createElement('li');
	            li.innerHTML = 'from: ' + photo.from.id + ' id: ' + photo.id + ' location: ' + location.name + ' in ' + location.state +' in ' + location.country + ' (' + location.latitude + ', ' + location.longitude + ')';
	            list.appendChild(li);
	          }
	        };
	      });

	    };
	}
	else {
		console.log(response.error);
	}
})};


// <h1>Reading Edges from the Graph API</h1>

// <p>We previously showed you a simple example of reading data from the Graph API. This example expands that a bit to show you how to handle a list of data rather than a single piece of info, and how that list can be transformed into individual elements. We'll show you a response containing some of the Facebook Pages that you like.</p>

// <h2>Adding Permissions</h2>

// <p>First, we'll need the <code>user_likes</code> permission to make this request, so we'll insert a Login button which requests that permission (click on this if you haven't already granted it):</p>

// <div class="fb-login-button" data-scope="user_photos" data-max-rows="1" data-size="medium"></div>

// <h2>Using FB.api()</h2>

// <div id="apiResponse" class="btn btn-success" style="padding-top: 20px">Click here to show some of your Page likes (the API request might take a few seconds).</div>

// <ul id="userFriends"></ul>

// <script>  
// document.getElementById('apiResponse').onclick = function() {
//   FB.api('/me/friends?limit=50', function(response) {
//     Log.info('API response', response);
//     var list = document.getElementById('userFriends');
//     var _li = document.createElement('li');
//     _li.innerHTML = response.summary.total_count;
//     list.appendChild(_li);
//     var friendsId = [];
//     var friendsName = [];
//     for (var i=0; i < response.data.length; i++) {
//       //var li = document.createElement('li');
//       //li.innerHTML = response.data[i].name + " id: " + response.data[i].id;
//       friendsId.push(response.data[i].id);
//       friendsName.push(response.data[i].name);
//       //list.appendChild(li);
//     }
//     for (var i = 0; i < friendsId.length; i++) {
//       var lii = document.createElement('li');
//       lii.innerHTML = friendsName[i] + ' ->' + friendsId[i];
//       list.appendChild(lii);

//       FB.api('/'+friendsId[i]+'/photos?limit=50', function(response) {
//         var np = document.createElement('li');
//         np.innerHTML = 'nphotos = ' + response.data.length;
//         list.appendChild(np);
//         for (var j = 0; j < response.data.length; j++) {
//           var photo = response.data[j];
//           var place = photo.place;
//           if (place != undefined) {
//             var location = photo.place.location;
//             var li = document.createElement('li');
//             li.innerHTML = 'from: ' + photo.from.id + ' id: ' + photo.id + ' location: ' + location.name + ' in ' + location.state +' in ' + location.country + ' (' + location.latitude + ', ' + location.longitude + ')';
//             list.appendChild(li);
//           }
//         };
//       });

//     };
//   });
// }
// </script>

// <h3>Related Guides</h3>

// <p>Read <a href="https://developers.facebook.com/docs/javascript/quickstart/#graphapi">our quickstart to using the JavaScript SDK for Graph API calls</a> for more info.</p>