var elementsLoaded = 0;
var numberOfInitialResults = 9;

function createElement(photo) {
	console.log(photo);
	return $.parseHTML('<div class="col-md-4 portfolio-item"> \
		<a href="' + photo.link + '" target="blank"> <img class="img-responsive" + src="' + photo.url + '" alt=""> </a>\
		<h3><a href="#">Project Name</a></h3>\
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\
		</div>');
}

function createRow(id, photoList) {
	var father_div = $("#search_results");

	var $div = $("<div>", {id: "row" + id});

	for (var i = 0; i < 3; i++) {
		var element = createElement(photoList[i]);
		father_div.append(element);
	}
	father_div.append($div);
}

function searchByKeyword() {
	var keyword = $("#search_box").val();
	console.log("Showing results for " + keyword);
	$('#result_keyword').text("Results for: " + keyword);
	
	var listFb = searchForFriendsPhotosMock(keyword);
	//var listFlickr = GetByKeyWordFlickr(keyword);

	//show initial results
	console.log(listFb.length);
	for (var i = 0; i < listFb.length && i < numberOfInitialResults; i = i + 4) {
		elementsLoaded++;
		var tempList = listFb.slice(i, i+3);
		createRow(i, tempList);
	}
	console.log(listFb);
	createRow(1);
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