//need a click event for the search button which search for the weather data of the city
var cities = []
var searchBtn = $("#searchBtn")
var displayDay = moment().format("L")

console.log(displayDay);


searchBtn.on("click", function() {
    var inputData = $("#searchBar").val()
    cities.push(inputData)

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + inputData + "&cnt=6&units=imperial&appid=f75ae5425b4709812bd7285990411889"
    


    // "https://api.openweathermap.org/data/2.5/onecall?" + inputData + "&exlude=current,minutely,hourly,alerts&units=imperial&appid=f75ae5425b4709812bd7285990411889"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.list);
        var results = response.list;
        

        var mainTitle = $("#mainTitle")
        mainTitle.text(response.city.name + " " + displayDay + " " + results[0].weather.icon)
        $("#mainTemp").text(results[0].temp.day + " °F")
        $("#mainHum").text(results[0].humidity + "%")
        $("#mainWind").text(results[0].speed + " MPH")
        $("mainUV")
        
        for(var i = 0; i < results.length; i++) {
            
        }
        localStorage.setItem(cities, JSON.stringify(results))
    })
})


searchBtn.on("click", function() {
    var newLi = $("<li>")
    newLi.attr("class", "list-group-item")
    newLi.text($("#searchBar").val())
})