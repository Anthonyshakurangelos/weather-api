var searchBtn = document.getElementById("search-btn");

var inputValue = document.querySelector("#inputValue");
var nameEl = document.querySelector("#name");
var desc = document.querySelector("#currentImg");

var currentTemp = document.querySelector("#currentTemp");
var currentDay = document.querySelector("#current");
var currentWind = document.querySelector("#currentWind");
var currentHumidity = document.querySelector("#currentHumidity");
var unhideDiv1 = document.getElementById("icons");
var unhideDiv1 = document.getElementById("icons1");
var unhideDiv2 = document.getElementById("icons2");
var unhideDiv3 = document.getElementById("icons3");
var unhideDiv4 = document.getElementById("icons4");

var unhideDiv5 = document.getElementById("icons5");
var city = [];
var hideDiv = document.getElementById("weatherImg");
var timeEl = $("#time-display");
var apiKey = "118c7f089309d40df508ea89da910c9e";
var lat;
var lon;

function displayTime() {
  var now = dayjs().format("M/D/YYYY");
  timeEl.text(now);
}

displayTime();

function getWeather() {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    inputValue.value +
    "&appid=118c7f089309d40df508ea89da910c9e&units=imperial";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data.coord.lat;
      lon = data.coord.lon;
      console.log(lat, lon)

      var tempValue = data["main"]["temp"];
      var descImg =
        "<img src =http://openweathermap.org/img/wn/" +
        data["weather"][0]["icon"] +
        ".png>";
      var humidityValue = data["main"]["humidity"];
      var windValue = data["wind"]["speed"];

      currentTemp.innerHTML = "temp: " + tempValue;
      currentDesc.innerHTML = descImg;
      currentHumidity.innerHTML = "Humidity: " + humidityValue + " %";
      currentWind.innerHTML = "Wind: " + windValue + " MPH";
      console.log(currentWind);
    });
}

searchBtn.addEventListener("click", getWeather);

function getApi() {
  var requestUrl5 = 'https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=118c7f089309d40df508ea89da910c9e&units=imperial';
//   var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  // var requestUrl5 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  console.log(requestUrl5);
  fetch(requestUrl5)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (i = 1; i < 16; i += 1) {
        for (i = 1; i < 16; i += 1) {
          document.getElementById("temp" + (i + 1)).innerHTML =
            "temp: " + data["list"][i]["main"]["temp"];
        }
      }
      for (i = 1; i < 16; i += 1) {
        document.getElementById("day" + (i + 1)).innerHTML =
          "Date: " + data["list"][i]["dt_txt"].split(" ")[0];
        for (i = 1; i < 16; i += 1) {
          document.getElementById("day" + (i + 1)).innerHTML =
            "Date: " + dayjs(data["list"][i]["dt_txt"]).format("M/D/YYYY");
        }
      }
      for (i = 1; i < 16; i += 1) {
        for (i = 1; i < 16; i += 1) {
          document.getElementById("wind" + (i + 1)).innerHTML =
            "wind: " + data["list"][i]["wind"]["speed"] + " MPH";
        }
      }
      for (i = 1; i <16; i += 1) {
        for (i = 1; i < 16; i += 1) {
          document.getElementById("humidity" + (i + 1)).innerHTML =
            "humidity: " + data["list"][i]["main"]["humidity"] + " %";
        }
      }
      for (i = 1; i < 16; i += 1) {
        for (i = 1; i < 16; i += 1) {
          document.getElementById("img" + (i + 1)).src =
            "http://openweathermap.org/img/wn/" +
            data["list"][i]["weather"][0]["icons"] +
            ".png";
        }
      }
    


var nameValue = data['city']['name'];
        nameEl.innerHTML = nameValue;
        localStorage.setItem('City', City);
        console.log(City)
         searchFunction()
         
      });
  }

searchBtn.addEventListener("click", getApi);


function removeHide() {
  unhideDiv.classList.remove("hide");
  unhideDiv1.classList.remove("hide");
  unhideDiv2.classList.remove("hide");
  unhideDiv3.classList.remove("hide");
  unhideDiv4.classList.remove("hide");
  unhideDiv5.classList.remove("hide");
  hideDiv.classList.add("hide");
}

searchBtn.addEventListener("click", removeHide);



function searchFunction(data) {

    City.push($('#inputValue').val()); 
    $('#inputValue').val(""); 
    $('#history').text(""); 
  
    $.each(City, function(index, value) {
      $('#history').append("<li class='historyItem'  onclick='addtoinputValue(" + index + ")'>" + value + '</li>');
    });
  }
  
  function addtoinputValue(id) {
    $('#inputValue').val(City[id]);
  }

// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
//

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// register for open weather api **

// save api key in a var **

// make click event for search button(still not working)

// take data from search box after we click button and save to a var
//  call a fetch request on weather api
// parse return data from fetch request
// pull weather icons from open weather
