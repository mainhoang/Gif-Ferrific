var topics = [];

$("#add-topic").on("click", function() {

    event.preventDefault();

    var inputValue = $("#topic-input").val();

    if (inputValue !== "") { // prevent empty btns

        var btn = $("<button>").attr("data-topic", inputValue).text(inputValue).addClass("topic-btns btn btn-primary");

    }

    $("#button-wrapper").append(btn);
    topics.push(inputValue);
    $("#topic-input").val("");

    console.log($("#topic-input"));

})

function animateGif () {
	
}

$(document).on("click", ".topic-btns", function() {

	var topic = $(this).attr("data-topic");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

	$("#gif-display").empty();

	$.ajax({
		url: queryURL,
        method: "GET"
	}).done(function(response){

		var results = response.data;
		console.log(results);

		for (var i = 0; i < results.length; i++) {
			var gifDiv = $("<div>").addClass("gif-div");
			var ratingDisplay = $("<p>").html("Rating: " + results[i].rating);
			var gif = $("<img>").attr("src", results[i].images.fixed_height_still.url);
			$("#gif-display").append(gifDiv);
			gifDiv.append(gif);
			gifDiv.append(ratingDisplay);

		}

	})

})

