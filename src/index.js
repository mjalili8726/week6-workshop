function returnDate(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let dayNum = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayNum];

  return day + " " + hours + ":" + minutes;
}

let dateTag = document.querySelector("#currentDate");
let currentDate = new Date();
dateTag.innerHTML = returnDate(currentDate);

function showTepm(response) {
  let temp = Math.round(response.data.main.temp);
  let degree = document.querySelector("#degree");
  degree.innerHTML = temp + "°";
  let wethDesc = document.querySelector("#wethDesc");
  wethDesc.innerHTML = response.data.weather[0].description;
  console.log(response.data);
}

function showCurrentTepm(response) {
  let temp = Math.round(response.data.main.temp);
  let degree = document.querySelector("#degree");
  degree.innerHTML = temp + "°";
  let cityShow = document.querySelector("#cityShow");
  cityShow.innerHTML = response.data.name;
  let wethDesc = document.querySelector("#wethDesc");
  wethDesc.innerHTML = response.data.weather[0].description;
}
function geoLocationFunc() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
function showCurrentPosition(position) {
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric&appid=" +
    apiKey;
  //console.log(position);
  axios.get(apiUrl).then(showCurrentTepm);
}
function searchWithCity(city) {
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  let cityShow = document.querySelector("#cityShow");
  cityShow.innerHTML = city;
  axios.get(apiUrl).then(showTepm);
}

function searchFunc(event) {
  event.preventDefault();
  let cityText = document.querySelector("#entercity");
  let city = cityText.value;
  let cityShow = document.querySelector("#cityShow");
  cityShow.innerHTML = city;
  searchWithCity(city);
}
let form = document.querySelector("#searchForm");
form.addEventListener("submit", searchFunc);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", geoLocationFunc);

searchWithCity("Tehran");
