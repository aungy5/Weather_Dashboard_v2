// establishing search button variable
var searchButton = $("#searchBtn")
var apiKey = "368da48690681af5e908ccf70a19f7bb";
//var prevSearchArr = [];
var searchInput = $("#searchInput").val();
var cityName;

for (var i = 0; i < localStorage.length; i++) {
  var prevSearchList = $("#prevSearch")
  var cityName = document.createElement('button')
  cityName.textContent = localStorage.getItem(i)
  prevSearchList.append(cityName)
  console.log(localStorage.getItem(i))
  console.log(localStorage)
}

var keyCount = 0;

function getApi(event) {
    event.preventDefault()
    
    var searchInput = $("#searchInput").val();
    console.log(searchInput);
    //localStorage.setItem('city', searchInput)
    //prevSearchCity = localStorage.setItem('city', searchInput)
    //console.log(localStorage)

    // URLs for API requests
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

    fetch(urlCurrent)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response);
        console.log(urlCurrent);
        console.log(response.main.temp)
        console.log(response.main.humidity)
        console.log(response.wind.speed)
        console.log(response.dt * 1000)

          var prevSearchList = $("#prevSearch")
          var cityName = document.createElement('button')
          cityName.textContent = response.name
          prevSearchList.append(cityName)

        var local = localStorage.setItem(keyCount, response.name)
        keyCount = keyCount + 1;
        console.log(localStorage)

        var currentCard = $("#currentCard")
        currentCard.empty();
        console.log(currentCard)

        var timeVal = new Date (response.dt * 1000);
        timeVal.toLocaleDateString("en-US")
        console.log(timeVal)

        var cardHeader = document.createElement('card')
        cardHeader.textContent = response.name + " " + timeVal.toLocaleDateString("en-US")
        console.log(response.name)
        currentCard.append(cardHeader)

        console.log(response.weather[0].description)
        console.log(response.weather[0].icon)
        
        var cardImg = document.createElement('img')
        cardImg.setAttribute('alt', `${response.weather[0].description}`)
        cardImg.src = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
        cardHeader.append(cardImg)

        var cardTemp = document.createElement('p')
        cardTemp.textContent = `Temperature: ${response.main.temp}`
        cardHeader.append(cardTemp)

        var cardHumidity = document.createElement('p')
        cardHumidity.textContent = `Humidity: ${response.main.humidity}`
        cardHeader.append(cardHumidity)

        var cardWind = document.createElement('p')
        cardWind.textContent = `Wind Speed: ${response.wind.speed}`
        cardHeader.append(cardWind)

        var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;
        fetch(urlUV)
        .then(function (response){
          return response.json();
        })
        .then(function(response){
          console.log(response)
          console.log(response.value)

          var indexUV = document.createElement('p')
          indexUV.textContent = `UV index: ${response.value}`
          cardHeader.append(indexUV)
        });
        
        fetch(urlFiveDay)
        .then(function (response){
          return response.json();
        })
        .then(function(response){
          console.log(response)

          var days = [0, 8, 16, 24, 32]

        var fiveDayCard = $("#fiveDayCard")
        fiveDayCard.empty();
        console.log(fiveDayCard)

        days.forEach(function (i) {
        
        var fiveDayTimeVal = new Date (response.list[i].dt * 1000);
        fiveDayTimeVal.toLocaleDateString("en-US")
        console.log(fiveDayTimeVal)

        var fiveDayCardHeader = document.createElement('card')
        fiveDayCardHeader.textContent = timeVal.toLocaleDateString("en-US")
        fiveDayCard.append(fiveDayCardHeader)
        
        var fiveDayCardImg = document.createElement('img')
        fiveDayCardImg.setAttribute('alt', `${response.list[i].weather[0].description}`)
        fiveDayCardImg.src = `https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`
        fiveDayCardHeader.append(fiveDayCardImg)

        var fiveDayCardTemp = document.createElement('p')
        fiveDayCardTemp.textContent = `Temperature: ${response.list[i].main.temp}`
        fiveDayCardHeader.append(fiveDayCardTemp)

        var fiveDayCardHumidity = document.createElement('p')
        fiveDayCardHumidity.textContent = `Humidity: ${response.list[i].main.humidity}`
        fiveDayCardHeader.append(cardHumidity)

        var fiveDayCardWind = document.createElement('p')
        fiveDayCardWind.textContent = `Wind Speed: ${response.list[i].wind.speed}`
        fiveDayCardHeader.append(fiveDayCardWind)
        })
        }); 
        //cityName.on('click', getApi);
    })};
searchButton.on('click', getApi);





