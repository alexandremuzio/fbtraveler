var listFb;
var elementsLoaded = 0;
var numberOfInitialResults = 6;

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
	console.log("idx = " + idx);
	if (photo.from == 'flickr') {
		return $.parseHTML('<div id="' + idx + '" class="col-xs-4"> \
		<a> <img src="' + photo.url + '" width="300" height="300" onclick="select_photo(event)"> </a>\
		<div><h4><b>' + photo.from + '</b></h4></div>\
		</div>');
	}
	else {
		return $.parseHTML('<div id="' + idx + '" class="col-xs-4"> \
		<a> <img src="' + photo.url + '" width="300" height="300" onclick="select_photo(event)"> </a><a target="blank" href="' + photo.link + '"><img src="/images/external.png" width="20" height="20" style="position: absolute; top: 307px; left: 296px;"/></a>\
		<div width="300" height="20"><h4><a href="' + photo.fromLink + '" target="blank"><b>' + photo.from + '</b></a></h4></div>\
		</div>');
	}
	//TODO: retirei    href="' + photo.link + '" target="blank"      do a da imagem
}

function createRow(id, photoList, limit) {
	var father_div = $("#search_results");

	var $div = $("<div>", {id: "row" + id, class: "row"});

	for (var i = 0; i < photoList.length; i++) {
		var element = createElement(photoList[i], photoList[i].id);
		$div.append(element);
		if (limit != "undefined" && i >= limit) break;
	}
	father_div.append($div);
}

function searchByKeyword() {
	clearAllRows();
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
		elementsLoaded += 3;
		var tempList = listFb.slice(i, i+3);
		createRow(Math.floor(i/3), tempList);
	}

	createRow(Math.floor(elementsLoaded/3), listFb.slice(elementsLoaded, listFb.length), listFb.length - elementsLoaded);
	elementsLoaded += listFb.length - elementsLoaded;
	console.log(listFb);
	// console.log(listFb);
	// //
	// 	for (var i = 0; i < listFb.length && i < numberOfInitialResults; i = i + 4) {
	// 		elementsLoaded++;
	// 		var tempList = listFb.slice(i, i+3);
	// 		createRow(i, tempList);
	// 	}
	// 	console.log(listFb.length);
	// 	createRow(1);
}



//after having created initial results
function loadNewRow() {
	console.log(elementsLoaded);
	if (elementsLoaded + 3 < listFb.length) {
		elementsLoaded+=3;
		var tempList = listFb.slice(elementsLoaded, elementsLoaded+3);
		console.log ('custom message2');
		createRow(elementsLoaded/3, tempList);
	}
}

function clearAllRows() {
	$(".row").remove();
	listFb = [];
	elementsLoaded = 0;
}

function showMap(list) {
	points = list;
	//...
}

$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
    	loadNewRow();
    	console.log("elementsLoaded = "  + elementsLoaded);
    	console.log("Reached bottom");
    }
});
