function showTepm(response) {
    let temp = Math.round(response.data.main.temp);
    let degree = document.querySelector("#degree");
    degree.innerHTML = temp + "°";
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
    console.log(position);
    axios.get(apiUrl).then(showTepm);
  }
  
  function searchFunc(event) {
    event.preventDefault();
    let cityText = document.querySelector("#entercity");
    let city = cityText.value;
    let cityShow = document.querySelector("#cityShow");
    cityShow.innerHTML = city;
    navigator.geolocation.getCurrentPosition(showCurrentPosition);

  }
  let form = document.querySelector("#searchForm");
  form.addEventListener("submit", searchFunc);
