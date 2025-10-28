document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const loginBtn = document.getElementById("loginBtn");
  const loginPopup = document.getElementById("loginPopup");
  const closeBtn = document.getElementById("closeBtn");
  const loginForm = document.getElementById("loginForm");
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const currentDate = document.getElementById("currentDate");
  const cityName = document.getElementById("cityName");
  const tempValue = document.getElementById("tempValue");
  const weatherDesc = document.getElementById("weatherDesc");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("windSpeed");
  const weatherIcon = document.getElementById("weatherIcon");

  // Update current date and time
  function updateDateTime() {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
  }

  // Initialize date and update every minute
  updateDateTime();
  setInterval(updateDateTime, 60000);

  // Login functionality
  loginBtn.addEventListener("click", () => {
    loginPopup.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    loginPopup.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === loginPopup) {
      loginPopup.style.display = "none";
    }
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    alert(`Welcome back, ${username}!`);
    loginPopup.style.display = "none";
    loginBtn.textContent = `Hello, ${username}`;
  });

  // Search functionality
  searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
      searchWeather(city);
    } else {
      alert("Please enter a city name.");
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const city = searchInput.value.trim();
      if (city) {
        searchWeather(city);
      } else {
        alert("Please enter a city name.");
      }
    }
  });

  // Mock weather data for demonstration
  const weatherData = {
    "guwahati": {
      city: "Guwahati, Assam, India",
      temp: 28,
      desc: "Sunny",
      humidity: 65,
      wind: 12,
      icon: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png"
    },
    "delhi": {
      city: "Delhi, India",
      temp: 35,
      desc: "Partly Cloudy",
      humidity: 45,
      wind: 8,
      icon: "https://cdn-icons-png.flaticon.com/512/414/414927.png"
    },
    "mumbai": {
      city: "Mumbai, Maharashtra, India",
      temp: 32,
      desc: "Humid",
      humidity: 75,
      wind: 15,
      icon: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png"
    },
    "kolkata": {
      city: "Kolkata, West Bengal, India",
      temp: 33,
      desc: "Cloudy",
      humidity: 70,
      wind: 10,
      icon: "https://cdn-icons-png.flaticon.com/512/414/414825.png"
    },
    "chennai": {
      city: "Chennai, Tamil Nadu, India",
      temp: 34,
      desc: "Sunny",
      humidity: 60,
      wind: 14,
      icon: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png"
    }
  };

  // Search weather function
  function searchWeather(city) {
    const normalizedCity = city.toLowerCase();
    
    if (weatherData[normalizedCity]) {
      const data = weatherData[normalizedCity];
      cityName.textContent = data.city;
      tempValue.textContent = data.temp;
      weatherDesc.textContent = data.desc;
      humidity.textContent = data.humidity;
      windSpeed.textContent = data.wind;
      weatherIcon.src = data.icon;
      
      // Update forecast temperatures based on searched city
      updateForecast(data.temp);
    } else {
      alert("City not found in our database. Try: Guwahati, Delhi, Mumbai, Kolkata, or Chennai");
    }
  }

  // Update forecast based on current temperature
  function updateForecast(baseTemp) {
    const forecastTemps = document.querySelectorAll('.forecast-temp');
    forecastTemps.forEach((tempEl, index) => {
      // Generate temperatures around the base temperature
      const variation = (Math.random() * 6) - 3; // -3 to +3
      const forecastTemp = Math.round(baseTemp + variation);
      tempEl.textContent = `${forecastTemp}°C`;
    });
  }

  // Initialize with default city
  searchWeather("guwahati");
});