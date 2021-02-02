//need a click event for the search button which search for the weather data of the city
var cities = []
var searchBtn = $("#searchBtn")
var displayDay = moment().format("L")
var fiveDay = ["0", "1", "2", "3", "4", "5"]
var lat = ""
var long = ""

console.log(displayDay);


searchBtn.on("click", function() {
    var inputData = $("#searchBar").val()
    cities.push(inputData)

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + inputData + "&cnt=6&units=imperial&appid=f75ae5425b4709812bd7285990411889"
    


    // queryURL for UV index
    //"https://api.openweathermap.org/data/2.5/onecall?" + inputData + "&exlude=current,minutely,hourly,alerts&units=imperial&appid=f75ae5425b4709812bd7285990411889"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.list);
        var results = response.list;
        
        //save longitude and latitude to variables for second ajax call to rretireve UV index


        var mainTitle = $("#mainTitle")
        mainTitle.text(response.city.name + " " + displayDay + " " + results[0].weather.icon)
        $("#mainTemp").text(results[0].temp.day + " °F")
        $("#mainHum").text(results[0].humidity + "%")
        $("#mainWind").text(results[0].speed + " MPH")
        $("mainUV")
        
        for(var i = 1; i < results.length; i++) {
            fiveDay[i].attr($("h6").text(displayDay));
            var temp = fiveDay[i].temp.day
            fiveDay[i].attr($(".class").text(temp))
        }


        localStorage.setItem($("#searchBar").val(), JSON.stringify(results))
    })
})

//make a function for second ajax call to retrieve UV index



searchBtn.on("click", function() {
    var newLi = $("<button>")
    newLi.attr("class", "list-group-item")
    newLi.text($("#searchBar").val())
    $("#citiesList").append(newLi)
})