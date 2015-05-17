var listFb;
var elementsLoaded = 0;
var numberOfInitialResults = 9;

function createElement(photo, idx) {
	console.log(photo);
	return $.parseHTML('<div id="' + idx + '" class="col-xs-4"> \
		<a> <img src="' + photo.url + '" width="250" height="250" onclick="select_photo()"> </a>\
		<h3><a href="#">Project Name</a></h3>\
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\
		</div>');

	//TODO: retirei    href="' + photo.link + '" target="blank"      do a da imagem
}

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

function createRow(id, photoList) {
	var father_div = $("#search_results");

	var $div = $("<div>", {id: "row" + id, class: "row"});

	for (var i = 0; i < photoList.length; i++) {
		var element = createElement(photoList[i], i);
		$div.append(element);
	}
	father_div.append($div);
}

function searchByKeyword() {
	var keyword = $("#search_box").val();
	console.log("Showing results for " + keyword);
	$('#result_keyword').text("Results for: " + keyword);
	
	listFb = searchForFriendsPhotosMock(keyword);

	//var listFlickr = GetByKeyWordFlickr(keyword);

	//asyncronous method
	flickrGetPhotosUrlByString(keyword, listFb);

	//show initial results
	console.log(listFb.length);

	for (var i = 0; i + 3 < listFb.length && i < numberOfInitialResults; i = i + 3) {
		var tempList = listFb.slice(i, i+3);
		createRow(i/3, tempList);
	}
	var tempList = listFb.slice(i, listFb.length);
	createRow(i/3, tempList);

	console.log(listFb);
// //
// 	for (var i = 0; i < listFb.length && i < numberOfInitialResults; i = i + 4) {
// 		elementsLoaded++;
// 		var tempList = listFb.slice(i, i+3);
// 		createRow(i, tempList);
// 	}
// 	console.log(listFb.length);
// 	createRow(1);
}


function showMap(list) {
	points = list;
	//...
}

//after having created initial results
function loadNewRow() {
	elementsLoaded = 0;
	for (var i = elementsLoaded; i < listFb.length; i = i + 4) {
	elementsLoaded++;
	var tempList = listFb.slice(i, i+3);
	createRow(i, tempList);
	}
}


$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
    	//loadNewRow();
    	console.log("Reached bottom");
    }
});