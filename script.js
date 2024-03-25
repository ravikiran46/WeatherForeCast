const apiKey = "bc24cc9dc0aa32410193cdecb4d83208";

document
  .getElementById("search-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const cityInput = document.getElementById("city-input");
    const cityName = cityInput.value.trim();

    if (cityName === "") {
      alert("Please enter a city name");
      return;
    }

    const weatherData = await getWeatherData(cityName);

    if (weatherData) {
      displayWeatherInfo(weatherData);
    } else {
      alert("Failed to fetch weather data");
    }
  });

async function getWeatherData(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

function displayWeatherInfo(weatherData) {
  const weatherInfoDiv = document.getElementById("weather-info");
  weatherInfoDiv.innerHTML = `
  <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
  <hr>
    <p>Temperature: ${weatherData.main.temp}°C</p>
    <p>Weather: ${weatherData.weather[0].description}</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
    <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
  `;
}
