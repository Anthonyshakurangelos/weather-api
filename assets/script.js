// const apiKey = '118c7f089309d40df508ea89da910c9e';

// // Get DOM elements
// const searchInput = document.getElementById('search-input');
// const searchButton = document.getElementById('search-button');
// const locationElement = document.getElementById('location');
// const dateElement = document.getElementById('date');
// const weatherIconElement = document.getElementById('weather-icon');
// const temperatureElement = document.getElementById('temperature');
// const windElement = document.getElementById('wind');
// const humidityElement = document.getElementById('humidity');
// const weatherDescriptionElement = document.getElementById('weather-description');
// const forecastElement = document.getElementById('forecast');

// // Handle search button click event
// searchButton.addEventListener('click', () => {
//   getWeatherData(searchInput.value);
// });

// // Get weather data from API
// async function getWeatherData(location) {
//   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
//   const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     const forecastResponse = await fetch(forecastApiUrl);
//     const forecastData = await forecastResponse.json();
//     displayWeatherData(data, forecastData);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Display weather data
// function displayWeatherData(data, forecastData) {
//   // Location and date
//   locationElement.innerText = `${data.name}, ${data.sys.country}`;
//   const date = new Date();
//   dateElement.innerText = date.toDateString();

//   // Weather icon
//   const iconCode = data.weather[0].icon;
//   const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
//   weatherIconElement.innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}" />`;

//   // Temperature, wind, and humidity
//   const tempFahrenheit = (data.main.temp * 9/5) + 32;
//   temperatureElement.innerHTML = `${data.main.temp.toFixed(1)}&#176;F`;
//   windElement.innerText = `Wind: ${data.wind.speed} m/s`;
//   humidityElement.innerText = `Humidity: ${data.main.humidity}%`;

//   // Weather description
//   weatherDescriptionElement.innerText = `${data.weather[0].description}`;

//   // Forecast
//   let forecastHtml = '';
//   for (let i = 0; i < forecastData.list.length; i++) {
//     const forecast = forecastData.list[i];
//     const forecastDate = new Date(forecast.dt_txt);
//     if (forecastDate.getHours() === 12) {
//       const forecastIconCode = forecast.weather[0].icon;
//       const forecastIconUrl = `https://openweathermap.org/img/w/${forecastIconCode}.png`;
//       const forecastTemperature = forecast.main.temp.toFixed(1);
//       forecastHtml += `<div class="forecast-item">
//                           <div class="forecast-date">${forecastDate.toDateString()}</div>
//                           <div class="forecast-icon"><img src="${forecastIconUrl}" alt="${forecast.weather[0].description}" /></div>
//                           <div class="forecast-temperature">${forecastTemperature}&#176;C</div>
//                         </div>`;
//     }
//   }
//   forecastElement.innerHTML = forecastHtml;
// }

const apiKey = '118c7f089309d40df508ea89da910c9e';

// Get DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const locationElement = document.getElementById('location');
const dateElement = document.getElementById('date');
const weatherIconElement = document.getElementById('weather-icon');
const temperatureElement = document.getElementById('temperature');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');
const weatherDescriptionElement = document.getElementById('weather-description');
const forecastElement = document.getElementById('forecast');

// Handle search button click event
searchButton.addEventListener('click', () => {
  getWeatherData(searchInput.value);
});

// Get weather data from API
async function getWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const forecastResponse = await fetch(forecastApiUrl);
    const forecastData = await forecastResponse.json();
    displayWeatherData(data, forecastData);

    // Save search to local storage
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(location);
    localStorage.setItem('searches', JSON.stringify(searches));
  } catch (error) {
    console.error(error);
  }
}

// Display weather data
function displayWeatherData(data, forecastData) {
  // Location and date
  locationElement.innerText = `${data.name}, ${data.sys.country}`;
  const date = new Date();
  dateElement.innerText = date.toDateString();

  // Weather icon
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
  weatherIconElement.innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}" />`;

  // Temperature, wind, and humidity
  const fahrenheitTemp = data['main']['temp'];
  temperatureElement.innerHTML = "temp: " + fahrenheitTemp;
  windElement.innerText =  data['wind']['speed'];
  humidityElement.innerText = data['main']['humidity'];

  // Weather description
  weatherDescriptionElement.innerText = `${data.weather[0].description}`;

  // Forecast
  let forecastHtml = '';
  for (let i = 0; i < forecastData.list.length; i++) {
    const forecast = forecastData.list[i];
    const forecastDate = new Date(forecast.dt_txt);
    if (forecastDate.getHours() === 12) {
      const forecastIconCode = forecast.weather[0].icon;
      const forecastIconUrl = `https://openweathermap.org/img/w/${forecastIconCode}.png`;
      const forecastTemperature = ((forecast.main.temp )).toFixed(1);
      forecastHtml += `<div class="forecast-item">
                          <div class="forecast-date">${forecastDate.toDateString()}</div>
                          <div class="forecast-icon"><img src="${forecastIconUrl}" alt="${forecast.weather[0].description}" /></div>
                          <div class="forecast-temperature">${forecastTemperature}</div>
                        </div>`;
    }
  }
  forecastElement.innerHTML = forecastHtml;
   }

