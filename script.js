//need a click event for the search button which search for the weather data of the city
var cities = []
var searchBtn = $("#searchBtn")
var displayDay = moment().format("L")
var fiveDay = ["0", "#1st", "#2nd", "#3rd", "#4th", "#5th"]
var lat = ""
var long = ""

console.log(displayDay);


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
        
        //save longitude and latitude to variables for second ajax call to retireve UV index
        var iconCode = results[0].weather[0].icon
        console.log(iconCode);
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"

        var mainTitle = $("#mainTitle")
        mainTitle.text(response.city.name + " " + displayDay)
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


        localStorage.setItem($("#searchBar").val(), JSON.stringify(results))
    })
})


//make a function for second ajax call to retrieve UV index

    // queryURL for UV index
    //"https://api.openweathermap.org/data/2.5/onecall?" + inputData + "&exlude=current,minutely,hourly,alerts&units=imperial&appid=f75ae5425b4709812bd7285990411889"


searchBtn.on("click", function() {
    var newLi = $("<button>")
    newLi.attr("class", "list-group-item")
    newLi.text($("#searchBar").val())
    $("#citiesList").append(newLi)
})

//make a function to get the locale stored value and set it to event listener to the created button