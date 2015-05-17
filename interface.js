function create_element(photo, id) {
	console.log(photo);
	/*return $.parseHTML('<div class="col-md-4 portfolio-item"> \
		<a href="' + photo.link + '" target="blank"> <img class="img-responsive" + src="' + photo.url + '" alt=""> </a>\
		<h3><a href="#">Project Name</a></h3>\
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\
		</div>');
	*/
	return $.parseHTML('<div class="col-xs-4"><a href="' + photo.link + '" target="blank"> <img src="' + photo.url + '" width="250" height="250"> </a>\
		<h3><a href="#">Project Name</a></h3>\
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\
		</div>');
}

function create_row(id, photoList) {
	var father_div = $("#search_results");

	var $div = $("<div>", {id: "row" + id, class: "row"});

	for (var i = 0; i < photoList.length; i++) {
		var element = create_element(photoList[i], i);
		$div.append(element);		
	}
	father_div.append($div);
}

function searchByKeyword() {
	var keyword = $("#search_box").val();
	console.log("Showing results for " + keyword);
	$('#result_keyword').text("Results for: " + keyword);
	
	var listFb = searchForFriendsPhotosMock(keyword);
	//var listFlickr = GetByKeyWordFlickr(keyword);

	console.log(listFb.length);
	var i;
	for (i = 0; i + 3 < listFb.length; i = i + 3) {
		var tempList = listFb.slice(i, i+3);
		create_row(i/3, tempList);
	}
	var tempList = listFb.slice(i, listFb.length);
	create_row(i/3, tempList);

	console.log(listFb);
}