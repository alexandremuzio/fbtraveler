var listFb;

function select_photo() {
	//var checkbox = $(this);
	var parent_div = checkbox.parent();
	var idx = parseInt(parent_div.attr("id"));
	//if (checkbox.is(':checked')) {
	if (!listFb[idx]) {
		listFb[idx].chosen = 1;
		parent_div.css("background-color","green");
	}
	else {
		listFb[idx].chosen = 0;
		parent_div.css("background-color","");
	}
}

function create_element(photo, idx) {
	console.log(photo);
	return $.parseHTML('<div id="' + idx + '" class="col-md-4 portfolio-item"> \
		<a> <img class="img-responsive" + src="' + photo.url + '" alt="" onclick="select_photo()"> </a>\
		<h3><a href="#">Project Name</a></h3>\
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\
		</div>');

	//TODO: retirei    href="' + photo.link + '" target="blank"      do a da imagem
}

function create_row(id, photoList) {
	var father_div = $("#search_results");

	var $div = $("<div>", {id: "row" + id});

	for (var i = 0; i < 3; i++) {
		var element = create_element(photoList[i], i);
		father_div.append(element);
	}
	father_div.append($div);
}

function searchByKeyword() {
	var keyword = $("#search_box").val();
	console.log("Showing results for " + keyword);
	$('#result_keyword').text("Results for: " + keyword);
	
	listFb = searchForFriendsPhotosMock(keyword);
	//var listFlickr = GetByKeyWordFlickr(keyword);

	console.log(listFb.length);
	for (var i = 0; i < listFb.length; i = i + 4) {
		var tempList = listFb.slice(i, i+3);
		create_row(i, tempList);
	}
	console.log(listFb);
	create_row(1);
}

