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
time.innerHTML = `${day} -`;

//Display Weather Condition
function displayWeatherCondition(response) {
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#current-degrees").innerHTML =
    Math.round(celsiusTemperature);
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
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);
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
let celsiusTemperature = null;
function changeToFahrenheit(event) {
  event.preventDefault();
  linkF.classList.add("active");
  linkC.classList.remove("active");
  linkC.classList.add("not-selected");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#current-degrees").innerHTML = Math.round(
    fahrenheitTemperature
  );
}
let linkF = document.querySelector("#fahrenheit");
linkF.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  linkC.classList.add("active");
  linkF.classList.remove("active");
  linkF.classList.add("not-selected");
  document.querySelector("#current-degrees").innerHTML =
    Math.round(celsiusTemperature);
}
let linkC = document.querySelector("#celsius");
linkC.addEventListener("click", changeToCelsius);

//Search default city
searchCity("Barcellona");
