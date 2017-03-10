var topics = ["monkey", "dogs", "fish"];

function renderBtns() {

    $("#button-wrapper").empty();

    for (var i = 0; i < topics.length; i++) {

        var btn = $("<button>").attr("data-topic", topics[i]).text(topics[i]).addClass("topic-btns btn btn-warning");
        
        $("#button-wrapper").append(btn);
        $("#topic-input").val("");

    }

}

function animateGifs() {

    var state = $(this).attr("data-state");

    if (state === "still") {

        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    } else {

        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    }

}

function showGifs() {

    var topic = $(this).attr("data-topic");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    $("#gif-display").empty();

    $.ajax({

        url: queryURL,
        method: "GET"

    }).done(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div>").addClass("gif-div");
            var ratingDisplay = $("<p>").html("Rating: " + results[i].rating);
            var stillGif = results[i].images.fixed_height_still.url;
            var movingGif = results[i].images.fixed_height.url;
            var gif = $("<img>").attr("src", stillGif).attr("data-state", "still").attr("data-animate", movingGif).attr("data-still", stillGif).addClass("gif");

            $("#gif-display").append(gifDiv);
            gifDiv.append(gif);
            gifDiv.append(ratingDisplay);

        }

    });

}

$("#add-topic").on("click", function() {

    event.preventDefault();

    var inputValue = $("#topic-input").val();

    topics.push(inputValue);

    if (inputValue !== "") { // prevent empty btns

        renderBtns();
    }

});

$(document).on("click", ".topic-btns", showGifs);
$(document).on("click", ".gif", animateGifs);
renderBtns();
