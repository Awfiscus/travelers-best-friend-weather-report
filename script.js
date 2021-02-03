//need a click event for the search button which search for the weather data of the city
var cities = []
var searchBtn = $("#searchBtn")
var fiveDay = ["0", "#1st", "#2nd", "#3rd", "#4th", "#5th"]
var lat = ""
var long = ""



// function addingDays() {
//     var 
// }

searchBtn.on("click", function city() {
    var inputData = $("#searchBar").val()
    cities.push(inputData)

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + inputData + "&cnt=6&units=imperial&appid=f75ae5425b4709812bd7285990411889"
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.list);
        var results = response.list;
        lat = response.city.coord.lat
        long = response.city.coord.lon
        //save longitude and latitude to variables for second ajax call to retireve UV index
        var iconCode = results[0].weather[0].icon
        console.log(iconCode);
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"
        var date =new Date(results[0].dt * 1000)
        var localTime = date.toLocaleString()
        var mainTitle = $("#mainTitle")
        mainTitle.text(response.city.name + " " + localTime)
        $("#iconTitle").attr("src", iconUrl)
        $("#mainTemp").text("Temprature: " + results[0].temp.day + " °F")
        $("#mainHum").text("Humidity: " + results[0].humidity + "%")
        $("#mainWind").text("Wind Speed: " + results[0].speed + " MPH")
        
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
        console.log(response.city.coord.lat);
        retrieveUV()

        localStorage.setItem($("#searchBar").val(), JSON.stringify(results))
    })
})


//make a function for second ajax call to retrieve UV index

function retrieveUV() {
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exlude=current,minutely,hourly,alerts&units=imperial&appid=f75ae5425b4709812bd7285990411889"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#mainUV").text("UV Index: " + response.daily[0].uvi)
        if(parseInt(response.daily[0].uvi) >= 6) {
            $("#mainUV").attr("id", "danger")
        }
    })
}

    // queryURL for UV index
    


searchBtn.on("click", function() {
    var newLi = $("<button>")
    newLi.attr("class", "list-group-item")
    newLi.attr("id", "historyBtn")
    newLi.text($("#searchBar").val())
    $("#citiesList").append(newLi)

})


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
