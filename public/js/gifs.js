
 
    var reactionCounter = 0

    $("#getGifs").on("click", function (event) {
            event.preventDefault();
            $("#gifDiv").empty();
            console.log("hi")
    reactionCounter++
   var offset = (reactionCounter * 25);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=cat&offset=" + offset + "&api_key=pUQxAeyd7mmJQpZYgXXUmvzxHWPi1ZD6";
  
    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (response) {
        for (var i = 0; i < 25; i++) {
  
            var gifDiv = $("#gifDiv");
    
            //ADD GIF TO IMAGE DIV
            var stillURL = response.data[i].images.fixed_height_still.url;
            var animateURL = response.data[i].images.fixed_height.url;
            var gifImg = $("<img>");
            gifDiv.append(gifImg)
  
            //ADD STILLIMAGE, ANIMATES & DATA SOURCE
            gifImg.attr("src", stillURL);
            gifImg.attr("data-still", stillURL);
            gifImg.attr("data-animate", animateURL);
            gifImg.attr("data-state", "still");
            gifImg.addClass("gif");
  
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

    offset += (reactionCounter * 25);

