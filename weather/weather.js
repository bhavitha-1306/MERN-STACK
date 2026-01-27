// Wait until the full HTML page is loaded
document.addEventListener("DOMContentLoaded", () => {

  // 🔹 Getting required HTML elements
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  // 🔹 OpenWeather API key
  const API_KEY = "1cd2b29249eb7e5be5488409f40af3ad";

  // 🔹 Button click event
  getWeatherBtn.addEventListener("click", async () => {

    // Read city name and remove extra spaces
    const city = cityInput.value.trim();

    // If input is empty, stop execution
    if (!city) return;

    try {
      // Call API and wait for weather data
      const weatherData = await fetchWeatherData(city);

      // Display weather on UI
      displayWeatherData(weatherData);

    } catch (error) {
      // If API fails or city not found
      showError();
    }
  });

  // 🔹 Fetch weather data from OpenWeather API
  async function fetchWeatherData(city) {

    // API URL with city name, metric units & API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    // Send request to server
    const response = await fetch(url);

    // If response is not successful (404, 400 etc.)
    if (!response.ok) {
      throw new Error("City not found");
    }

    // Convert response to JSON
    const data = await response.json();

    // Return weather data
    return data;
  }

  // 🔹 Display weather details on screen
  function displayWeatherData(data) {

    // Destructure required values from API response
    const { name, main, weather } = data;

    // Update UI text
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}°C`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    // Show weather info and hide error
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  // 🔹 Show error message when city is invalid
  function showError() {

    // Hide weather info
    weatherInfo.classList.add("hidden");

    // Show error message
    errorMessage.classList.remove("hidden");
  }

});
