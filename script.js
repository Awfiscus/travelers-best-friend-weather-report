//GLOBAL VARIABLE DECLARATIONS
var cities = []
var searchBtn = $("#searchBtn")
var fiveDay = ["0", "#1st", "#2nd", "#3rd", "#4th", "#5th"]
var lat = ""
var long = ""




//When the search button is clicked it does an ajax call to openweathermap to retrieve a six day forecast for the input value put in
searchBtn.on("click", function city() {
    var inputData = $("#searchBar").val()
    cities.push(inputData)

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + inputData + "&cnt=6&units=imperial&appid=f75ae5425b4709812bd7285990411889"
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //response.list is saved in a results variable for future use
        var results = response.list;
        //latitude and longitude variables are saved for use in a later function to retrieve uv index
        lat = response.city.coord.lat
        long = response.city.coord.lon
        //varibles created to store icon used by OPW API to use icon
        var iconCode = results[0].weather[0].icon
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"
        //variables created to format date given by OPW API into something legible by the user
        var date =new Date(results[0].dt * 1000)
        var localTime = date.toLocaleString()
        //varible created for DOM element
        var mainTitle = $("#mainTitle")
        //assinging DOM elements values based on response from OWM
        mainTitle.text(response.city.name + " " + localTime)
        $("#iconTitle").attr("src", iconUrl)
        $("#mainTemp").text("Temprature: " + results[0].temp.day + " °F")
        $("#mainHum").text("Humidity: " + results[0].humidity + "%")
        $("#mainWind").text("Wind Speed: " + results[0].speed + " MPH")
        //for loop used to populate the information for 5 day for cast
        for(var i = 1; i < results.length; i++) {
           var iconCode = results[i].weather[0].icon
           var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"
           var date =new Date(results[i].dt * 1000)
           var localTime = date.toLocaleString()
           $(fiveDay[i]).children(".date").text(localTime) 
           $(fiveDay[i]).children(".temp").text(results[i].temp.day + " °F")
           $(fiveDay[i]).children(".humidity").text(results[i].humidity + "%")
           $(fiveDay[i]).children(".symbol").attr("src", iconUrl)

        }
        //runs function to retrieve uv index
        retrieveUV()

        localStorage.setItem($("#searchBar").val(), JSON.stringify(results))
    })
})



//function to retieve uvindex and then assing it into DOM
function retrieveUV() {
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exlude=current,minutely,hourly,alerts&units=imperial&appid=f75ae5425b4709812bd7285990411889"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#mainUV").text("UV Index: " + response.daily[0].uvi)
        if(parseInt(response.daily[0].uvi) >= 6) {
            $("#mainUV").attr("class", "danger")
        } else if (parseInt(response.daily[0].uvi) <= 5 && parseInt(response.daily[0].uvi) >= 3) {
            $("#mainUV").attr("class", "moderate")
        } else {
            $("#mainUV").attr("class", "good")
        }
    })
}

    

//on click creates clickable element for search history
searchBtn.on("click", function() {
    var newLi = $("<button>")
    newLi.attr("class", "list-group-item")
    newLi.attr("id", "historyBtn")
    newLi.text($("#searchBar").val())
    $("#citiesList").append(newLi)

})

//sets up a future event listener for dynamically created DOM elements in the history list and the provides the same function to them that populates the DOM with OWM data
$(document).on('click','#historyBtn', function() {

    var inputData = this.textContent
    console.log(this.textContent);
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + inputData + "&cnt=6&units=imperial&appid=f75ae5425b4709812bd7285990411889"
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        lat = response.city.coord.lat
        long = response.city.coord.lon
        var results = response.list;
        var iconCode = results[0].weather[0].icon
        console.log(iconCode);
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"
        var date =new Date(results[0].dt * 1000)
        var localTime = date.toLocaleString()

        var mainTitle = $("#mainTitle")
        mainTitle.text(response.city.name + " " + localTime)
        $("#iconTitle").attr("src", iconUrl)
        $("#mainTemp").text(results[0].temp.day + " °F")
        $("#mainHum").text(results[0].humidity + "%")
        $("#mainWind").text(results[0].speed + " MPH")
        
        for(var i = 1; i < results.length; i++) {
           var iconCode = results[i].weather[0].icon
           var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"

           $(fiveDay[i]).children(".temp").text(results[i].temp.day + " °F")
           $(fiveDay[i]).children(".humidity").text(results[i].humidity + "%")
           $(fiveDay[i]).children(".symbol").attr("src", iconUrl)
        }
        retrieveUV()

    
})
})

function setSearchHistory() {
    var values = []
	$("#last-search").empty()
	keys = Object.keys(localStorage),
	i = keys.length;

	//function that pushes keys values in locale storage into the array of values until there are none left to push
	while ( i-- ) {
        values.push(JSON.parse(localStorage.getItem(keys[i])));
	}

	//for loop that applies the newly created array of values from the while loop into divs and attaches them to last-search div
	for(var index = 0; index < values.length; index++) {
        var newLi = $("<button>")
        newLi.attr("class", "list-group-item")
        newLi.attr("id", "historyBtn")
        newLi.text(keys[index])
        $("#citiesList").append(newLi)
	}
}

setSearchHistory()