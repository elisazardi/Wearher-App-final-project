//define time variables
let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let year = now.getFullYear();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

//change h2 in html with real time
let time = document.querySelector("#date");
time.innerHTML = `${day} ${hour}:${minutes},`;

//Display Weather Condition
function displayWeatherCondition(response) {
  document.querySelector("#current-degrees").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector(
    "#future-forecast"
  ).innerHTML = `Next 5 days in ${response.data.city}:`;
}

//Search function
function searchCity(city) {
  let apiKey = "fa303238t2b72o631ab5a346fd3e0bab";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//Handle submit
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//current location

function searchLocation(position) {
  let apiKey = "fa303238t2b72o631ab5a346fd3e0bab";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getCurrentLocation);

//change from degrees to f
function changeToFahrenheit(event) {
  event.preventDefault();
  let currentDegrees = document.querySelector("#current-degrees");
  currentDegrees.innerHTML = "66";
}
let linkDegrees = document.querySelector("#degrees-to-f");
linkDegrees.addEventListener("click", changeToFahrenheit);

function changeToDegrees(event) {
  event.preventDefault();
  let currentDegrees = document.querySelector("#current-degrees");
  currentDegrees.innerHTML = "18";
}
let linkFahrenheit = document.querySelector("#f-to-degrees");
linkFahrenheit.addEventListener("click", changeToDegrees);

//Search default city
searchCity("Barcellona");
