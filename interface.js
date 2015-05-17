function create_element(photo) {
	console.log("test!");
	return $.parseHTML('<div class="col-md-4 portfolio-item"><a href="#"><img class="img-responsive" src="http://placehold.it/700x400" alt=""></a><h3><a href="#">Project Name</a></h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p></div>');
}

function create_row(id) {
	var father_div = $("#search_results");

	var $div = $("<div>", {id: "row" + id});
	var photo;
	for (var i = 0; i < 3; i++) {
		var element = create_element(photo);
		father_div.append(element);
	}
	father_div.append($div);
}

function searchByKeyword() {
	var keyword = $("#search_box").val();
	console.log("Showing results for " + keyword);
	$('#result_keyword').text("Results for: " + keyword);
	//var listFB = GetByKeyWordFacebook(keyword);
	//var listFlickr = GetByKeyWordFlickr(keyword);

	// for (var i = 0; i < listFb.length; i = i + 4) {
	// 	var temp_list = listFB(i, i+4);
	// 	create_row();
	// }
	create_row(1);
}