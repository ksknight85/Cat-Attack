var userData
var gold
var silver
var bronze
var winnersArray = []

$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    game()

    $.get("/api/user_data").then(function(data) {

        userData = data.id
        console.log(userData)
        if (userData) {
            $("#catSearch").html(`<div class="navbar-nav"><a class="nav-item nav-link" href="./gifs.html">Pick a Cat<span class="sr-only"></span></a></div>`)
            $("#user-name").text(" " + data.firstName)
            $("#goProfile").html(`<div class="navbar-nav"><a class="nav-item nav-link active" href="./members.html">Go to Profile<span class="sr-only"></span></a></div>`)
            $("#logoutButton").html(`<div class="navbar-nav"><a class="nav-item nav-link active" id="logout" href="/logout">Logout<span class="sr-only"></span></a></div>`)
        } else {
           $("#user-name").text(" Player!") 
           $("#signuplogin").html(` <h2 id="code">Wanna add your own cat to the tournament? <i class="em em-heart_eyes_cat"></i></h2><a href="/login"><button class="pulse">Sign-In</button></a><h3>or</h3><a href="/signup"><button class="raise">Sign-Up</button></a>`)
        }
    });
    $.get("/api/winners").then(function (data) {
        for (var i = 0; i < 3; i++) {
            var short = data[i]
            winnersArray.push(short.url)

        }
        gold = winnersArray[0];
        silver = winnersArray[1];
        bronze = winnersArray[2]

        $(".gold").append("<img src=" + gold + ">")
        $(".silver").append(("<img src=" + silver + ">"))
        $(".bronze").append("<img src=" + bronze + ">")
    })
});


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

// GAME FUNCTIONALITY
$(".gif").on("click", function (event) {
    if ((this.id === "gif1") || (this.id === "gif2")) {
        $("#winOf12").attr("src", this.src)
    }
    else if ((this.id === "gif3") || (this.id === "gif4")) {
        $("#winOf34").attr("src", this.src)
    }
    else if ((this.id === "winOf12") || (this.id === "winOf34")) {
        if ($("#winOf12").attr("src") === undefined || $("#winOf34").attr("src") === undefined) {
            return
        }
        else {
            $("#winner").attr("src", this.src)
            if (userData) {
                $(".modal-footer").html(`<button type="button" id="addFav" class="btn btn-default" data-dismiss="modal">Add to Favorites</button>`)
                $("#addFav").attr("data-url", this.src)
                //    gifButton.attr("data-url", animateURL)
            }
            $("#winner-gif").attr("src", this.src).css("width", "100%");
            // Show the modal with the best match
            $("#results-modal").modal("toggle");
        }
    }
});

$("#results-modal").on("click", "#addFav", function (){
    var url = $(this).attr("data-url")
    console.log("addfav URL", url)
    $.post("/api/fav", {
        url: url,
        userId: userData
    },function(data) {
        console.log(data)
    })
    // console.log(url)
})

var urlGif1
var urlGif2
var urlGif3
var urlGif4

function game() {
    $.get("/api/CHANGEME", function (data) {
        var data0 = data[0]
        var data1 = data[1]
        var data2 = data[2]
        var data3 = data[3]

        urlGif1 = data0[0].url
        urlGif2 = data1[0].url
        urlGif3 = data2[0].url
        urlGif4 = data3[0].url
        console.log(urlGif1, urlGif2, urlGif3, urlGif4)
    })
}
function populateImages() {
    $("#gif1").attr("src", urlGif1);
    $("#gif2").attr("src", urlGif2);
    $("#gif3").attr("src", urlGif3);
    $("#gif4").attr("src", urlGif4);
}

$("#play").on("click", function (event) {
    $("#winOf12").attr("src", "");
    $("#winOf34").attr("src", "");
    $("#winner").attr("src", "");
    populateImages()

})

$("#reset").on("click", function (event) {
    game()
    $("#gif1").attr("src", "http://123emoji.com/wp-content/uploads/2016/08/2812144885035685763.png");
    $("#gif2").attr("src", "https://i.pinimg.com/originals/da/30/71/da3071998b4652b86539329a3680aedf.jpg");
    $("#gif3").attr("src", "https://media.tenor.com/images/a665568e629b3fff3184960ca50d909d/tenor.png");
    $("#gif4").attr("src", "https://img.clipartimage.com/pusheen-the-cat-eating-pizza-gifs-cat-eating-pizza-clipart-480_270.gif");
    $("#winOf12").attr("src", "");
    $("#winOf34").attr("src", "");
    $("#winner").attr("src", "");
})


$("#logout").on("click", function(){
    $.get("/logout").then(function(data) {
      console.log(data)
    });
})
