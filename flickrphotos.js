function flickrGetPhotosUrlByString(searchPattern, ans) {
	var count = 0;
	console.log ('func ' + searchPattern);
	//var start = new Date().getTime();
	$.ajax({type : 'GET',
			async : true,
			url : "https://api.flickr.com/services/rest/?method=flickr.places.find&api_key=1233dbff2601b204cad268c94eaa6496&query="+searchPattern+"&format=json&nojsoncallback=1", 
    		success : function (data) {                                                    
    			//console.log ('first callback');
				$.ajax({
					type: 'GET',
					async : true,
					url : "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1233dbff2601b204cad268c94eaa6496&sort=interestingness-desc&format=json&nojsoncallback=1&woe_id="+data.places.place[0].woeid, 
			     	success : function (data2) {
			     		//console.log ('second callback');
		 	 		   	var tam = 100;
		 	 		   	//var count = 0;
				     	if (data2.photos.photo.length < tam)
				     		tam = data2.photos.photo.length ;
					 	for (var i = 0; i < tam; i++) {
							url = 'https://farm'+data2.photos.photo[i].farm+'.staticflickr.com/'+data2.photos.photo[i].server+'/'
							+data2.photos.photo[i].id+'_'+data2.photos.photo[i].secret+'.jpg';
							var x, y;
							$.ajax({
								type : 'GET', 
								async : true,
								url : 'https://api.flickr.com/services/rest/?photo_id='+data2.photos.photo[i].id+'&method=flickr.photos.geo.getLocation&api_key=1233dbff2601b204cad268c94eaa6496&format=json&nojsoncallback=1',
								success : function (data3) {
										x = data3.photo.location.latitude;
										y = data3.photo.location.longitude;
										ans.push ({url : url, chosen : 0, from : 'flickr', x : x, y : y, id : count++});
										//console.log ('location ' + data3.photo.location);
							}});							
							
							//console.log ('url ' + url + ' x ' + x + ' y ' + y);
					  		//count++;
					  		//if (count == 100) 
					  		//	console.log (new Date().getTime() - start);
					 	}
	     		}});

    }});
	//console.log ('chegou no while');
};