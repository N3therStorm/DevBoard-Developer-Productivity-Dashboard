export async function fetchWeather() {
  const display = document.getElementById('weather-display');
  try {
    navigator.geolocation.getCurrentPosition(async pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const apiKey = 'YOUR_OPENWEATHER_API_KEY';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      display.innerHTML = `
        <p>${data.name}</p>
        <p>${data.weather[0].main} - ${data.main.temp.toFixed(1)}°C</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" />
      `;
    });
  } catch (err) {
    display.textContent = 'Weather data unavailable.';
  }
}
