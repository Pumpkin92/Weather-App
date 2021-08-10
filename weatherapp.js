// keep this - time and daty

let currentDate = new Date();

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let days = day[currentDate.getDay()];
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let todayDate = document.querySelector("#date-time");
todayDate.innerHTML = `${days}, ${hours}:${minutes}`;
// change below here

function showTemp(response) {
  console.log(response);
  console.log(response.data.wind.speed);
  let cityResult = document.querySelector("#city-title");
  cityResult.innerHTML = response.data.name;
  let countryResult = document.querySelector("#country");
  countryResult.innerHTML = response.data.sys.country;
  let temp = Math.round(response.data.main.temp);
  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = `${temp}`;
  let windSpeed = document.querySelector("#wind-speed");
  let windRound = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${windRound}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
}

function countryResult(event) {
  event.preventDefault();
  let textField = document.querySelector("#type-here");
  let city = textField.value;
  let apiKey = "a2e69ade2d5f80fe8dd4f0ed09576a2a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemp);
}

let h1 = document.querySelector("#city-title");

let search = document.querySelector("#search-field");
search.addEventListener("submit", countryResult);
//geo location
function showWeather(response) {
  let cityResult = document.querySelector("#city-title");
  cityResult.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempFigure = document.querySelector("#temp-number");
  tempFigure.innerHTML = `${temperature}`;
  let windSpeed = document.querySelector("#wind-speed");
  let windRound = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${windRound}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let countryResult = document.querySelector("#country");
  countryResult.innerHTML = response.data.sys.country;
}

function retrievePosition(position) {
  let apiKey = "a2e69ade2d5f80fe8dd4f0ed09576a2a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let geoButton = document.querySelector("button");
geoButton.addEventListener("click", getPosition);
