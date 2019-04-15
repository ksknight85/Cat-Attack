var userData;

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    // console.log(data)
    $(".member-name").text(data.firstName);
    userData = data.id
    // console.log(userData)
    if (userData) {
        $("#user-name").text(" " + data.firstName)
    } else {
       $("#user-name").text(" Player!") 
    }
  });
});

$("#logout").on("click", function(){
  $.get("/logout").then(function(data) {
    console.log(data)
  });
})
