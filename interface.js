var listFb;
var elementsLoaded = 0;
var numberOfInitialResults = 9;

function select_photo(event) {
	//var checkbox = $(this);
	var parent_div = $(event.target).parent().parent();
	
	var idx = parseInt(parent_div.attr("id"));
	console.log(idx);
	//if (checkbox.is(':checked')) {
	if (!listFb[idx].chosen) {
		listFb[idx].chosen = 1;
		//parent_div.css("background-color","green");
		$(event.target).css("border", "solid 10px green");
	}
	else {
		listFb[idx].chosen = 0;
		//parent_div.css("background-color","");
		$(event.target).css("border", "");
	}
}

function createElement(photo, idx) {
	console.log(photo);
	if (photo.from == 'flickr') {
		return $.parseHTML('<div id="' + idx + '" class="col-xs-4"> \
		<a> <img src="' + photo.url + '" width="300" height="300" onclick="select_photo(event)"> </a>\
		<h4><b>' + photo.from + '</b></h4>\
		</div>');
	}
	else {
		return $.parseHTML('<div id="' + idx + '" class="col-xs-4"> \
		<a> <img src="' + photo.url + '" width="300" height="300" onclick="select_photo(event)"> </a>\
		<h4><a href="' + photo.fromLink + '" target="blank"><b>' + photo.from + '</b></a></h4>\
		</div>');
	}
	//TODO: retirei    href="' + photo.link + '" target="blank"      do a da imagem
}

function createRow(id, photoList) {
	var father_div = $("#search_results");

	var $div = $("<div>", {id: "row" + id, class: "row"});

	for (var i = 0; i < photoList.length; i++) {
		var element = createElement(photoList[i], photoList[i].id);
		$div.append(element);
	}
	father_div.append($div);
}

function searchByKeyword() {
	var keyword = $("#search_box").val();
	console.log("Showing results for " + keyword);
	$('#result_keyword').text("Best results for " + keyword);
	$('#result_keyword').css("text-align", "center");
	
	listFb = searchForFriendsPhotosMock(keyword);

	//var listFlickr = GetByKeyWordFlickr(keyword);	

	//asyncronous method
	flickrGetPhotosUrlByString(keyword, listFb);
	console.log(listFb.length);

	for (var i = 0; i < listFb.length; i++) {
		listFb[i].id = i;
	};

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
