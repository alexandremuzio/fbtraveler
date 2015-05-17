//API Requests

function searchForFriendsPhotos(country) {
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

function searchForFriendsPhotosMock(country) {

photos = [
	{
		x: 47.596203,
		y: -122.333215,
		url: "https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/1619329_929201957124741_7000234925829646414_n.jpg?oh=68dbe5de382ea9696f1792dc711688f1&oe=55C5BC50&__gda__=1438870830_1a50827140eb232fa004fad75f84e577",
		link: "https://www.facebook.com/photo.php?fbid=929201957124741",
		location: "CenturyLink Field",
		from: "Alexandre Muzio",
		fromLink: "https://www.facebook.com/100001048354922",
		country: "United States"
	},
	{
		x: -23.578917,
		y: -45.323406,
		url: "https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/10348364_668965803202815_2350424364936073538_n.jpg?oh=fcaa41cbfd73780140eade90b99de4d3&oe=55CF80CB&__gda__=1439564659_003837cf63b556a4b20b5e3c5ced640e",
		link: "https://www.facebook.com/photo.php?fbid=668965803202815",
		location: "Caraguatatuba",
		from: "Lucas Müller M Oliveira",
		fromLink: "https://www.facebook.com/100002682030295",
		country: "Brazil"
	},
	{
		x: -23.587445,
		y: -46.680653,
		url: "https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-xtf1/v/t1.0-9/11265035_749193695180025_4843741529119448321_n.jpg?oh=5b0b1861962f5dab9c2a0497ec8c6d3c&oe=560D1E91&__gda__=1443003338_9ec66b2ecce0cc9e12d1c8127d957dbd",
		link: "https://www.facebook.com/photo.php?fbid=749193695180025",
		location: "Facebook São Paulo",
		from: "Lucas Müller M Oliveira",
		fromLink: "https://www.facebook.com/100002682030295",
		country: "Brazil"
	},
	{
		x: -23.204669,
		y: -45.883552,
		url: "https://scontent.xx.fbcdn.net/hphotos-xpa1/v/l/t1.0-9/18232_870542912984616_4647516357887010896_n.jpg?oh=8a89d13f19411bfb2b61a630607985aa&oe=55CBB986",
		link: "https://www.facebook.com/photo.php?fbid=870542912984616",
		location: "ITA",
		from: "Matheus Ferraz",
		fromLink: "https://www.facebook.com/100000867477504",
		country: "Brazil"
	},
	{
		x: 41.896549,
		y: 12.482445,
		url: "https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-9/318561_180869988666337_2113088858_n.jpg?oh=6d9f95ea11d434570ecbb611993265cd&oe=55C6172D&__gda__=1439057060_ffcc7f5dc10d22c9ed017b12b2f1616d",
		link: "https://www.facebook.com/photo.php?fbid=180869988666337",
		location: "Piazza Venezia",
		from: "Victor Pascoal",
		fromLink: "https://www.facebook.com/100002300127658",
		country: "Italy"
	},
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
	},
	{
		x: 45.434095,
		y: 12.339154,
		url: "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/311723_180872408666095_874713209_n.jpg?oh=2c78dcc772a897e2c49fd070524b332b&oe=56099D91&__gda__=1439896128_4a89ebf3b9748a8e2fdf299bb390c698",
		link: "https://www.facebook.com/photo.php?fbid=180872408666095",
		location: "Campanário de São Marcos",
		from: "Victor Pascoal",
		fromLink: "https://www.facebook.com/100002300127658",
		country: "Italy"
	}
];

	var ret_list = [];
	for (var i = 0; i < photos.length; i++) {
		if (photos[i].country == country) {
			ret_list.push(photos[i]);
		}
	}
	return ret_list;
}

function showFacebookProfilePhoto() {
    FB.api('/me?fields=name,picture', function(response) {
    	console.log(response);
      document.getElementById('profile_photo').innerHTML = ('<img src="' + response.picture.data.url + '" height="30" width="30">');
})};