var userData;
var emojis = 0;

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    // console.log(data)
    $(".member-name").text(data.firstName);
    userData = data.id
    console.log(userData)
    if (userData) {
        $("#user-name").text(" " + data.firstName)
    } else {
       $("#user-name").text(" Player!") 
    }
  });
  $.get("/api/wins", function(data) {
    for (var i=0; i<data.length; i++) {
      if (data[i].UserId === userData) {
        var yourImg = $("<div>");
        yourImg.addClass("yourDiv")
        var myImage = $("<img>")
        myImage.attr("src", data[i].url)
        myImage.addClass("myImg");
        var yourButton = $("<button>Delete</button>");
        yourButton.attr("data-user", userData)
        yourButton.attr("data-url", data[i].url)
        yourButton.attr("id", "deleteYourGif")
        yourButton.addClass("raise")
        yourImg.append(myImage)
        yourImg.append(yourButton)
        $(".yourCats").append(yourImg)
        emojis += data[i].wins   
      }
    }
    console.log(emojis)
    for (var i=0; i<emojis; i++) {
      var littleEmoji = $("<i></i>")
      littleEmoji.addClass("em em-heart_eyes_cat profileCats")
      $(".innerWins").append(littleEmoji)
  }
    })

  $.get("/api/fav").then(function(data){
    for (var i=0; i<data.length; i++) {
      if(data[i].UserId === userData){
        var gifImg = $("<div>");
        gifImg.addClass("gifDiv")
        var favImage = $("<img>");
        favImage.addClass("favImg");
        favImage.attr("src", data[i].url)
        var gifButton = $("<button>Delete</button>")
        gifButton.attr("data-user", userData)
        gifButton.attr("data-url", data[i].url)
        gifButton.attr("id", "deleteGif")
        gifButton.addClass("raise")
      gifImg.append(favImage)
      gifImg.append(gifButton)
      $(".favCats").append(gifImg)
      }
    }
  })

});


$("#logout").on("click", function(){
  $.get("/logout").then(function(data) {
  });
})

$(".favCats").on("click", "#deleteGif", function(event) {
  
  event.preventDefault();
  var user = $(this).attr("data-user");
  var URL = $(this).attr("data-url")

  var chosen = {
    UserId: user,
    url: URL
  }
console.log(chosen)
  $.ajax({
    method: "DELETE",
    url: "/api/delete",
    data: chosen
  })
    .then(function(data) {
      console.log(data)
    });
  $(this).parent().empty()
})

$(".yourCats").on("click", "#deleteYourGif", function(event) {
  
  event.preventDefault();
  var user = $(this).attr("data-user");
  var URL = $(this).attr("data-url")

  var chosen = {
    UserId: user,
    url: URL
  }
console.log(chosen)
  $.ajax({
    method: "DELETE",
    url: "/api/wins",
    data: chosen
  })
    .then(function(data) {
      console.log(data)
    });
  $(this).parent().empty()
})

