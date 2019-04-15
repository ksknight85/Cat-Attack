var userData;

$(document).ready(function () {

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {

        userData = data.id
        console.log(userData)
        if (userData) {
            $("#user-name").text(" " + data.firstName)
        } else {
            $("#user-name").text(" Player!")
        }
    });
});

var reactionCounter = 0

$("#getGifs").on("click", function (event) {
    event.preventDefault();
    $("#gifDiv").empty();
    reactionCounter++

    var offset = (reactionCounter * 10);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=cat&offset=" + offset + "&api_key=pUQxAeyd7mmJQpZYgXXUmvzxHWPi1ZD6";

    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (response) {
        for (var i = 0; i < 25; i++) {

            var gifDiv = $("#gifDiv");


            var gifEach = $("<div>")
            gifEach.addClass("eachGif")

            //ADD GIF TO IMAGE DIV
            var stillURL = response.data[i].images.fixed_height_still.url;
            var animateURL = response.data[i].images.fixed_height.url;
            var gifImg = $("<img>");

            gifEach.append(gifImg)

            var gifButton = $("<button>Pick me!</button>")
            gifButton.addClass("selectMe raise")
            gifButton.attr("data-id", userData)
            gifButton.attr("data-url", animateURL)
            gifEach.append(gifButton)


            //ADD STILLIMAGE, ANIMATES & DATA SOURCE
            gifImg.attr("src", stillURL);
            gifImg.attr("data-still", stillURL);
            gifImg.attr("data-animate", animateURL);
            gifImg.attr("data-state", "still");
            gifImg.addClass("gif");


            gifDiv.append(gifEach)


        };
    });

})

//pause and animate
$("#gifDiv").on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

})

$("#gifDiv").on("click", ".selectMe", function () {
  var picked = $(this).attr("data-url")
  var userId= $(this).attr("data-id")

  var chosen = {
    url: picked,
    id: userId
  } 
  console.log(chosen)
$.post("/api/gifs", chosen, function(data) {
  console.log(data) 
})
});


//rainbow gradient div
var colors = new Array(
  [62, 35, 255],
  [60, 255, 60],
  [255, 35, 98],
  [45, 175, 230],
  [255, 0, 255],
  [255, 128, 0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient() {

    if ($ === undefined) return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    $('.gradient').css({
        background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
    }).css({
        background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    });

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

    }
}

setInterval(updateGradient, 10);

$("#logout").on("click", function () {
    $.get("/logout").then(function (data) {
        console.log(data)
    });
})
