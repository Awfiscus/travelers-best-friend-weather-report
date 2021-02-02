//need a click event for the search button which search for the weather data of the city

var searchBtn = $("#searchBtn")

searchBtn.on("click", function() {
    var inputData = $("#searchBar").val()
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + inputData + "&cnt=5&appid=f75ae5425b4709812bd7285990411889"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.list);
        var results = response.list
        
        for(var i = 0; i < results.length; i++) {

        }
    })
})

searchBtn.on("click", function() {
    localStorage.setItem("City")
})