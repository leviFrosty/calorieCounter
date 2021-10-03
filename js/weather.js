const API_KEY = "3e8bfa331a606b8a0cd7f95bbfc5714d";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  // Fetch is a promise
  // Promise fulfills, which contains the entire HTTP response
  // To pull only the body from the HTTP response, you call .json(), which then creates another promise
  // when .json() fulfills, you take the data (which is the entire HTTP response body) and log it to the console.
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      response.json().then((data) => {
        const weatherContainer = document.querySelector(".weather-container");
        const weatherSpan = weatherContainer.querySelector("span");
        const temperature = data.main.temp;
        weatherSpan.innerText = temperature;
      });
    })
    .catch((error) => console.log(error));
}

function onGeoError() {
  alert("Can't find you, weather unsuccefully loaded.");
}

const userLocation = navigator.geolocation.getCurrentPosition(
  onGeoOk,
  onGeoError
);
