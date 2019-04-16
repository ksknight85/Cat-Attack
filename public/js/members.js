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
        emojis += data[i].wins
      }
    }
    console.log(emojis)
    for (var i=0; i<emojis; i++) {
      var littleEmoji = $("<i></i>")
      littleEmoji.addClass("em em-heart_eyes_cat profileCats")
      $(".innerWins").append(littleEmoji)
  }
  for (var i=0; i<data.length; i++) {
    if(data[i].UserId === userData) {
    var favImage = $("<img>")
    favImage.attr("src", data[i].url)
    $(".yourCats").append(favImage)
    }
  }  
    })
  
});

$("#logout").on("click", function(){
  $.get("/logout").then(function(data) {
  });
})





